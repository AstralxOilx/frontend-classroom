// app/login/page.tsx

"use client";  // เพิ่ม "use client" ที่บรรทัดแรก

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/react';


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    const res = await signIn('credentials', {
      redirect: false,  // ไม่ให้ redirect ไปหน้าอื่น
      email: email,
      password: password
    });

    setLoading(false);  // รีเซ็ตสถานะการโหลดหลังจากทำการล็อกอิน




  };

  // console.log(session)

  const findProfile = async () => {
    const res = await fetch("http://localhost:4000/users/profile", {
      method: "GET",
      credentials: 'include', // ส่ง cookies ไปกับคำขอ
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.accessToken}` // ตั้งค่าคุกกี้ใน header
      },
    });




    if (res.ok) {
      const data = await res.json();
      console.log(data);  // แสดงผลข้อมูลที่ได้รับ
    } else {
      console.error("Failed to fetch profile");
    }
  };



  return (
    <>

      <Button onClick={findProfile} >FindProfile</Button>
      <Button variant={"destructive"} onClick={() => { signOut() }}>Sign out</Button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* แสดงข้อความ error */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
} 
