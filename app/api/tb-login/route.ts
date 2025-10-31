/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export async function POST() {
  try {
    const { TB_API_URL, TB_USERNAME, TB_PASSWORD } = process.env;

    if (!TB_API_URL || !TB_USERNAME || !TB_PASSWORD) {
      throw new Error("Missing ThingsBoard credentials");
    }

    const loginUrl = `${TB_API_URL}/api/auth/login`;

    const response = await axios.post(loginUrl, {
      username: TB_USERNAME,
      password: TB_PASSWORD,
    });

    const { token } = response.data;
    return Response.json({ token });
  } catch (error: any) {
    console.error(
      "ThingsBoard login error:",
      error.response?.data || error.message
    );
    return Response.json({ error: error.message }, { status: 500 });
  }
}
