import { delay, HttpResponse } from "msw";
import { http } from "../http";

export const profileHandlers = [
  http.post("/profile/avatar", async ctx => {
    const formData = await ctx.request.formData();
    const avatar = formData.get("avatar");

    if (!avatar || !(avatar instanceof File)) {
      return HttpResponse.json({ message: "File not found", code: "BAD_REQUEST" }, { status: 400 });
    }

    await delay(1000);

    const mockAvatarUrl = URL.createObjectURL(avatar);

    return HttpResponse.json(
      {
        avatarUrl: mockAvatarUrl,
      },
      { status: 200 }
    );
  }),

  http.put("/profile/avatar", async ctx => {}),
];
