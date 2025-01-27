import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// ฟังก์ชันช่วยสำหรับการตรวจสอบ role และ path
const redirectIfRoleMismatch = (req: NextRequest, role: string, basePath: string) => {
  const urlPath = req.nextUrl.pathname;
  if (urlPath.startsWith(basePath) && !urlPath.includes(`${basePath}/${role}`)) {
    return NextResponse.redirect(new URL(`${basePath}/${role}`, req.url));
  }
  return null;
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.redirect(new URL("/", req.url)); // ถ้าไม่มี token ไปหน้า login
  }

  const { roleName } = token;
  const urlPath = req.nextUrl.pathname;
 

  // ตรวจสอบ path สำหรับ /app/group
  if (urlPath.startsWith("/app/group")) {
    const roleRedirect = redirectIfRoleMismatch(req, roleName, "/app/group");
    if (roleRedirect) return roleRedirect;
  }

  // ตรวจสอบ path สำหรับ /app/dashboard
  if (urlPath.startsWith("/app/dashboard")) {
    const roleRedirect = redirectIfRoleMismatch(req, roleName, "/app/dashboard");
    if (roleRedirect) return roleRedirect;
  }

  // ตรวจสอบสิทธิ์การเข้าถึง role
  const allowedRoles = ["student", "teacher", "admin"];
  if (!allowedRoles.includes(roleName)) {
    return NextResponse.redirect(new URL("/", req.url)); // หาก role ไม่อยู่ในรายการอนุญาต
  }

  return NextResponse.next(); // หากตรวจสอบผ่านทั้งหมด ให้ไปหน้าถัดไป
}

// ระบุ matcher เพื่อใช้ Middleware กับเส้นทางที่ต้องการ
export const config = {
  matcher: ["/app/:path*"], // ตรวจสอบทุกเส้นทางใน /app/
};
