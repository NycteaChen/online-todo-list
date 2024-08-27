import { z } from "zod";

const otherSchema = z.object({
  nickname: z
    .string()
    .min(1, {
      message: "此欄位不可為空",
    })
    .max(50, {
      message: "暱稱最多 50 字",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "確認密碼至少 6 個字元",
    })
    .max(16, {
      message: "密碼最多 16 個字元",
    }),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "此欄位不可為空",
    })
    .email({
      message: "信箱格式錯誤",
    }),
  password: z
    .string()
    .min(6, {
      message: "密碼至少 6 個字元",
    })
    .max(16, {
      message: "密碼最多 16 個字元",
    }),
});

export const signUpSchema = signInSchema
  .merge(otherSchema)
  .superRefine(({ confirmPassword, password }, ctx) => {
    // https://stackoverflow.com/questions/73695535/how-to-check-confirm-password-with-zod
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "確認密碼與密碼不一致",
        path: ["confirmPassword"],
      });
    }
  });
