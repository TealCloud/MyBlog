export const prerender = false;

export async function GET() {
  try {
    const res = await fetch("https://my.ippure.com/v1/info", {
      headers: {
        "User-Agent": "TealCloudBlog/1.0",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "upstream_failed", status: res.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "network_error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
