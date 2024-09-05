'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";

interface Employee {
  id: number;
  dept_name: string;
  role_name: string;
  // Add other fields if necessary
}

const AddEmployee = () => {
  const router = useRouter();
 

  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setemail] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [date_of_birth, setdate_of_birth] = useState('');
  const [hire_date, sethire_date] = useState('');
  // const [position, setposition] = useState('');
  const [salary, setsalary] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [empHasDepartment, setEmpHasDepartment] = useState('');
  const [departmentRecords, setDepartmentRecords] = useState<Departmet[]>([]);
  const [empHasRole, setEmpHasRole] = useState('');
  const [roleRecords, setRoleRecords] = useState<Role[]>([]);


  interface Departmet {
    id: number;
    dept_name: string;
    // Add other fields if necessary
  }
  interface Role {
    id: number;
    name: string;
    // Add other fields if necessary
  }

  useEffect(() => {
    // Fetch departments for the dropdown list
    const fetchDept = async () => {
      try {
        const res = await AxiosInstance.get('/hrm/department');
        if (res) {
          setDepartmentRecords(res.data.data.data);
        }
      } catch (error) {
        console.log('Error occurred while fetching departments:', error);
      }
    };
  
    // Fetch roles for the dropdown list
    const fetchRole = async () => {
      try {
        const res = await AxiosInstance.get('/permission/role');
        if (res) {
          // Assuming you have another state to set roles
          setRoleRecords(res.data.data.data); // Update with appropriate state setter
        }
      } catch (error) {
        console.log('Error occurred while fetching roles:', error);
      }
    };
  
    fetchDept();
    fetchRole();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('phone_number', phone_number);
      formData.append('date_of_birth', date_of_birth);
      formData.append('hire_date', hire_date);
      // formData.append('position', position);
      // formData.append('department', department);
      formData.append('salary', salary);
      if (image) formData.append('image', image);
      formData.append('employee_has_dept', empHasDepartment);
      formData.append('employee_has_role', empHasRole);


      const response = await AxiosInstance.post('/hrm/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        console.log('Response:', response.data);
        router.push('/employeepage');
      }    // , { state: { message: 'Product Added!' } }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-20">
  <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Add Employee Here:</h2>
  <form className="mt-3" onSubmit={handleSubmit}>

    {/* First Name and Last Name on the same row */}
    <div className="grid grid-cols-2 gap-2 mb-4"> {/* Reduced gap */}
        <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">
            First Name
            </label>
            <input
            type="text"
            id="first_name"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">
            Last Name
            </label>
            <input
            type="text"
            id="last_name"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
            />
        </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Email */}
        <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-1000">
            Email
        </label>
        <input
            type="text"
            id="email"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={email}
            onChange={(e) => setemail(e.target.value)}
        />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">
            Phone Number
        </label>
        <input
            type="text"
            id="phone_number"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={phone_number}
            onChange={(e) => setphone_number(e.target.value)}
        />
        </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Date of Birth */}
        <div className="mb-4">
        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">
            Date Of Birth
        </label>
        <input
            type="text"
            id="date_of_birth"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={date_of_birth}
            onChange={(e) => setdate_of_birth(e.target.value)}
        />
        </div>

        {/* Hire Date */}
        <div className="mb-4">
        <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">
            Hire Date
        </label>
        <input
            type="text"
            id="hire_date"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={hire_date}
            onChange={(e) => sethire_date(e.target.value)}
        />
        </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-1000">
          Select Department
        </label>
        <select
          id="category"
          className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          onChange={(e) => setEmpHasDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {departmentRecords?.map((item) => (
            <option value={item.id} key={item.id}>
              {item.dept_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-1000">
          Select Position
        </label>
        <select
          id="role"
          className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          onChange={(e) => setEmpHasRole(e.target.value)}
        >
          <option value="">Select Position</option>
          {roleRecords?.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Salary */}
        <div className="mb-4">
        <label htmlFor="salary" className="block text-sm font-medium text-gray-1000">
            Salary
        </label>
        <input
            type="text"
            id="salary"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
        />
        </div>

        {/* Upload Image */}
        <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-1000">
            Upload Image
        </label>
        <input
            type="file"
            id="image"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg 
            file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 
            hover:file:bg-indigo-100"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        </div>
    </div>


    <button
      type="submit"
      className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
      text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
    >
      Submit
    </button>
  </form>
</div>

  
  );
};

export default AddEmployee;
