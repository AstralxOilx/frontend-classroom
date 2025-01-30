
"use client";
import React, { useEffect, useState } from 'react';
import SetPageName from '@/lib/setPageName';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";


import { ChevronRight, Code, CopyPlus, Ellipsis, LayoutList, ListCheck, ListCollapse, LockKeyhole, NotepadText, Paintbrush, Palette, PencilLine, PencilRuler, Plus, Search, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resource } from '@/types/resource';
import { Backend_URL } from '@/lib/constants';


export default function page() {
  const pageName = "กลุ่มเรียน";
  const [isOpenCreateClassroom, setIsOpenCreateClassroom] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');
  const [selectTerm, setSelectTerm] = useState('');
  const [errTxt, setErrTxt] = useState('');
  const [colors, setColors] = useState<resource[]>([]);
  const [permissions, setPermissions] = useState<resource[]>([]);
  const [faculty, setFaculty] = useState<resource[]>([]);
  const [department, setDepartment] = useState<resource[]>([]);
  const [formClassroomData, setFormClassroomData] = useState({
    name: "",
    subjectName: "",
    courseCode: "",
    description: "",
    password: "",
    facultyId: "1",
    departmentId: "1",
    colorId: "",
    permissionsId: "1",
  });

  useEffect(() => {
    findColors();
    findPermission();
    findFaculty();
    findDepartment();
    setFormClassroomData((prev) => ({
      ...prev,
      departmentId: "1",
    }));
  }, [formClassroomData.facultyId]);

  const findColors = async () => {
    const resColor = await fetch(`${Backend_URL}/resource/colors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataColor = await resColor.json(); // ใช้ await เพื่อให้ได้ข้อมูลที่ถูกต้อง
    setColors(dataColor); // ใช้ข้อมูลที่แปลงเป็น JSON แล้ว
  };

  const findPermission = async () => {
    const resPermission = await fetch(`${Backend_URL}/resource/permission`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataPermission = await resPermission.json();
    setPermissions(dataPermission);
  }

  const findFaculty = async () => {
    const resFaculty = await fetch(`${Backend_URL}/resource/faculty`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataFaculty = await resFaculty.json();
    setFaculty(dataFaculty);
  }

  const findDepartment = async () => {
    const resDepartment = await fetch(`${Backend_URL}/resource/department`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataDepartment = await resDepartment.json();
    setDepartment(dataDepartment);
  }

  const filteredDepartments = department.filter((dept) =>
    dept.facultyId === parseInt(formClassroomData.facultyId, 10) || dept.facultyId === 1
  );


  const handleChangeFormClassroomData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormClassroomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTextAreaClassroomData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormClassroomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSelectClassroomData = (name: string, value: string) => {
    setFormClassroomData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formClassroomData.permissionsId === "2") {
      setFormClassroomData((prev) => ({
        ...prev,
        password: "",
      }));
    }


  };

  const handleCreateClassroom = () => {

    const filteredData = Object.fromEntries(
      Object.entries(formClassroomData)
        .filter(([_, value]) => value.trim() !== "") // กรองข้อมูลที่ไม่ว่าง
        .map(([key, value]) => {
          // แปลงฟิลด์ที่ต้องการเป็น number
          if (['facultyId', 'departmentId', 'colorId', 'permissionsId'].includes(key)) {
            return [key, Number(value)]; // แปลงค่าเป็น number
          }
          return [key, value]; // ถ้าไม่ใช่ฟิลด์ที่ต้องการให้แปลง ก็คืนค่าตามเดิม
        })
    );

    try {
      if (!filteredData.name) {
        setErrTxt('กรุณาเพิ่มชื่อห้องเรียน');
        return;
      }

      if (filteredData.permissionsId === 1) {
        if (Number(filteredData.facultyId) === 1 && Number(filteredData.departmentId) === 1) {
          if (!filteredData.password || filteredData.password === "") {
            setErrTxt('กรุณาเพิ่มรหัสผ่านห้องเรียน');
            return;
          }
        }
      }

      setIsOpenCreateClassroom(!isOpenCreateClassroom);
      setErrTxt('');
      setFormClassroomData({
        name: "",
        subjectName: "",
        courseCode: "",
        description: "",
        password: "",
        facultyId: "1",
        departmentId: "1",
        colorId: "",
        permissionsId: "1",
      })
    } catch (error) {

    } finally {

    }



  }

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchTerm(e.target.value);
  }


  const handleChangeSelectTerm = (e: string) => {
    setSelectTerm(e);
  }

  const handleOpenCreateClassroom = () => {
    setIsOpenCreateClassroom(!isOpenCreateClassroom)
  }

  const handleSearchTerm = () => {

    console.log(searchTerm, '  ', selectTerm);
  }


  return (
    <>
      <SetPageName name={pageName} />
      <div className=' relative w-full h-full'>
        <div className='z-50 px-1 flex gap-1 justify-end items-center sticky top-0 w-full h-10 bg-background/50 backdrop-blur-md backdrop-brightness-105 shadow-sm '>
          <div className='bg-background flex gap-1 justify-center items-center'>
            <Input
              className='rounded-l-sm rounded-r-none'
              onChange={handleChangeSearchTerm}
              value={searchTerm}
              type='text'
              name='searchTerm'
              id='searchTerm'
            />
            <Select value={selectTerm} onValueChange={handleChangeSelectTerm}>
              <SelectTrigger className="rounded-none w-[100px]">
                <SelectValue placeholder="หมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ชื่อห้องเรียน">ชื่อห้อง</SelectItem>
                <SelectItem value="แผนก/วิชา">แผนก/วิชา</SelectItem>
                <SelectItem value="ผู้สอน">ผู้สอน</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"link"}
              className='rounded-l-none rounded-r-sm bg-gray-700 text-gray-100 hover:bg-gray-600'
              onClick={handleSearchTerm}
            >
              <Search />
            </Button>
          </div>
          <div className='grid justify-center items-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={
                    handleOpenCreateClassroom
                  }
                  className='
              flex gap-1 items-center justify-center text-gray-200
              bg-primary p-[0.4rem] rounded-sm
              '>
                  <CopyPlus size={25} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>สร้างห้องเรียน</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertDialog open={isOpenCreateClassroom}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='flex gap-1 items-center underline'><PencilRuler />คุณต้องการสร้างห้องเรียนใหม่?</AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                  <div className='grid gap-1 overflow-y-auto'>
                    <form className='grid gap-1 p-1'>
                      {
                        !errTxt ? null :
                          <div className='w-full p-2 text-rose-600 border rounded-md flex gap-1'>
                            <ChevronRight />{errTxt}
                          </div>
                      }
                      <div className='grid'>
                        <div className='flex items-center text-gray-600 dark:text-gray-300'>
                          <PencilLine size={20} />
                          <p>ชื่อห้องเรียน(#จำเป็น)</p>
                          <p className='text-rose-500'>*(มากสุด 20 ตัวอักษร)</p>
                        </div>
                        <Input
                          className='rounded-sm'
                          id='name'
                          name='name'
                          value={formClassroomData.name}
                          onChange={handleChangeFormClassroomData}
                          maxLength={20}
                        ></Input>
                      </div>

                      <div className='grid'>
                        <div className='flex items-center text-gray-600 dark:text-gray-300'>
                          <NotepadText size={20} />
                          <p>วิชาเรียน</p>
                          <p className='text-rose-500'>*(มากสุด 20 ตัวอักษร)</p>
                        </div>
                        <Input
                          className='rounded-sm'
                          id='subjectName'
                          name='subjectName'
                          value={formClassroomData.subjectName}
                          onChange={handleChangeFormClassroomData}
                          maxLength={20}
                        ></Input>
                      </div>
                      <div className='grid'>
                        <div className='flex items-center text-gray-600 dark:text-gray-300'>
                          <Code size={20} />
                          <p>รหัสวิชา</p>
                          <p className='text-rose-500'>*(มากสุด 30 ตัวอักษร)</p>
                        </div>
                        <Input
                          className='rounded-sm'
                          id='courseCode'
                          name='courseCode'
                          value={formClassroomData.courseCode}
                          onChange={handleChangeFormClassroomData}
                          maxLength={30}
                        ></Input>
                      </div>
                      <div className='grid'>
                        <div className='flex items-center text-gray-600 dark:text-gray-300'>
                          <ListCheck size={20} />
                          <p>คำอธิบายห้องเรียน</p>
                          <p className='text-rose-500'>*(มากสุด 100 ตัวอักษร)</p>
                        </div>
                        <Textarea
                          value={formClassroomData.description}
                          onChange={handleChangeTextAreaClassroomData}
                          name='description'
                          id='description'
                          maxLength={100}
                          className="h-20 resize-none"
                        />
                      </div>
                      <div className='p-2 flex gap-1 overflow-x-auto'>
                        <div className='grid'>
                          <div className='flex items-center text-gray-600 dark:text-gray-300'>
                            <Settings2 size={20} />
                            <p>สถานะ</p>
                          </div>
                          <Select
                            value={formClassroomData.permissionsId}
                            onValueChange={(value) => handleChangeSelectClassroomData("permissionsId", value)}
                          >
                            <SelectTrigger className="rounded-none w-[100px]">
                              <SelectValue placeholder="สถานะ" />
                            </SelectTrigger>
                            <SelectContent>
                              {permissions.map((permission) => (
                                <SelectItem key={permission.id} value={String(permission.id)}>
                                  {permission.name_th}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='grid'>
                          <div className='flex items-center text-gray-600 dark:text-gray-300'>
                            <ListCollapse size={20} />
                            <p>คณะ</p>
                          </div>
                          <Select
                            value={formClassroomData.facultyId}
                            onValueChange={(value) => handleChangeSelectClassroomData("facultyId", value)}
                          >
                            <SelectTrigger className="rounded-none w-[100px]">
                              <SelectValue placeholder="คณะ" />
                            </SelectTrigger>
                            <SelectContent>
                              {faculty.map((faculty) => (
                                <SelectItem key={faculty.id} value={String(faculty.id)}>
                                  {faculty.name_th}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='grid'>
                          <div className='flex items-center text-gray-600 dark:text-gray-300'>
                            <ListCollapse size={20} />
                            <p>สาขา</p>
                          </div>
                          <Select
                            value={formClassroomData.departmentId}
                            onValueChange={(value) => handleChangeSelectClassroomData("departmentId", value)}
                          >
                            <SelectTrigger className="rounded-none w-[100px]">
                              <SelectValue placeholder="สาขา" />
                            </SelectTrigger>
                            <SelectContent>
                              {filteredDepartments.map((dept) => (
                                <SelectItem key={dept.id} value={String(dept.id)}>
                                  {dept.name_th}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='grid'>
                          <div className='flex items-center text-gray-600 dark:text-gray-300'>
                            <Paintbrush size={20} />
                            <p>สีปก</p>
                          </div>
                          <Select
                            value={formClassroomData.colorId}
                            onValueChange={(value) => handleChangeSelectClassroomData("colorId", value)}
                          >
                            <SelectTrigger className="rounded-none w-[100px]">
                              <SelectValue placeholder="สี" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.id} value={String(color.id)}>
                                  {color.name_th}
                                  <section className={`w-[100px] h-[3px] ${colorMapping[color.name_en]}`}></section>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className={`grid ${formClassroomData.permissionsId === '2' ? 'hidden' : 'grid'}`}>
                        <div className='flex items-center text-gray-600 dark:text-gray-300'>
                          <LockKeyhole size={20} />
                          <p>รหัสห้องเรียน(#จำเป็น)</p>
                          <p className='text-rose-500'>*(มากสุด 20 ตัวอักษร)</p>
                        </div>
                        <Input
                          className='rounded-sm'
                          id='password'
                          name='password'
                          value={formClassroomData.password}
                          onChange={handleChangeFormClassroomData}
                          maxLength={20}
                        ></Input>
                      </div>
                    </form>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={
                      handleOpenCreateClassroom
                    }>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCreateClassroom}><Plus />สร้างห้องเรียน</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className='z-0 mt-1 overflow-auto h-[90%]'>



        </div>
      </div>
    </>
  )
}

export const colorMapping: Record<string, string> = {
  gray: 'bg-gray-600',
  orange: 'bg-orange-600',
  amber: 'bg-amber-600',
  yellow: 'bg-yellow-600',
  lime: 'bg-lime-600',
  green: 'bg-green-600',
  emerald: 'bg-emerald-600',
  teal: 'bg-teal-600',
  cyan: 'bg-cyan-600',
  sky: 'bg-sky-600',
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-600',
  violet: 'bg-violet-600',
  purple: 'bg-purple-600',
  fuchsia: 'bg-fuchsia-600',
  pink: 'bg-pink-600',
  rose: 'bg-rose-600',
  red: 'bg-red-600',
  stone: 'bg-stone-600',
  neutral: 'bg-neutral-600',
  zinc: 'bg-zinc-600',
  slate: 'bg-slate-600',
};
