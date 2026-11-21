/* Where the AGF sharing service listens.

   Set AGF_SHARE_ENDPOINT in .env.local. It is read from the environment rather than
   written in here because the address is not the same in every place this runs: the
   live site talks to link.agfgroupindia.com, and a developer testing against a machine
   on the office wifi talks to that machine. Hard-coding it meant the form posted at the
   live server from a laptop whose work had never been deployed there, so every
   submission reached a server that had never heard of the project — and the route
   answered 200 either way, because the request did leave and something did reply.

   The code at the end names the project. It comes from the Documents screen in the CRM
   (Website share button → Where your form posts to) and is different for every project,
   so copy it from there rather than from another site. */
const UPSTREAM =
  process.env.AGF_SHARE_ENDPOINT ??
  "https://link.agfgroupindia.com/api/public/share/nVhQg6-ujZED";

// Server-side proxy: the upstream API does not send CORS headers for our origin,
// so the browser calls this route and the server forwards the request.
export async function POST(request: Request) {
  let body: { name?: unknown; phone?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ detail: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 20) : "";

  try {
    // Pass the visitor's context through, so the sharing service can attribute the
    // lead and build its trackable link as it would for a direct browser request.
    const forward: Record<string, string> = { "Content-Type": "application/json" };
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const ua = request.headers.get("user-agent");
    const ip = request.headers.get("x-forwarded-for");
    if (origin) forward["Origin"] = origin;
    if (referer) forward["Referer"] = referer;
    if (ua) forward["User-Agent"] = ua;
    if (ip) forward["X-Forwarded-For"] = ip;

    const res = await fetch(UPSTREAM, {
      method: "POST",
      headers: forward,
      body: JSON.stringify({ name, phone }),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    // A reply that carried no JSON is not a success, whatever its status said. Without
    // this an upstream that answered with an HTML error page came back as an empty
    // object with status 200, and the form showed the visitor nothing at all.
    if (res.ok && typeof (data as { ok?: unknown }).ok === "undefined") {
      return Response.json(
        { detail: "The sharing service answered in a way we could not read." },
        { status: 502 },
      );
    }
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ detail: "Could not reach the sharing service. Please try again." }, { status: 502 });
  }
}
