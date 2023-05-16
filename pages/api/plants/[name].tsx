const baseUrl = process.env.NEXT_PUBLIC_API || "http://127.0.0.1:5200";

export default async function handler(req: any, res: any) {
  try {
    const { name } = req.query;
    const response = await fetch(
      `${baseUrl}/api/plants/${name}/generation-types`
    );
    const json = await response.json();

    res.send(json);
    return json;
  } catch (e: any) {
    console.log("Error sending data:", e.toString());
  }
}
