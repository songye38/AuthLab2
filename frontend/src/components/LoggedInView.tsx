"use client";

import React from "react";
import { logoutUser } from "./../api/auth"; // 경로는 네 프로젝트 구조에 맞게 조정!

interface Props {
  userName: string;
  loginSuccess?: string | null;
}

const LoggedInView: React.FC<Props> = ({ userName, loginSuccess }) => {
  console.log("userid",userName);
  console.log("loginSuccess", loginSuccess);
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-2xl shadow-md">
      {loginSuccess === "success" && (
        <p className="text-lg font-semibold">
          안녕하세요, {userName}님! 🎉 로그인 성공했습니다!
        </p>
      )}
      <button
        onClick={logoutUser}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        로그아웃
      </button>
    </div>
  );
};

export default LoggedInView;
