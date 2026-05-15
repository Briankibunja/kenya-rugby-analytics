"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "../../contexts/AuthContext";

const roleOptions: Array<{ label: string; value: UserRole; name: string; team: string }> = [
	{ label: "Admin", value: "admin", name: "Sarah Admin", team: "System" },
	{ label: "Coach", value: "coach", name: "John Coach", team: "KCB Rugby" },
	{ label: "Player", value: "player", name: "Mike Player", team: "KCB Rugby" },
	{ label: "Fan", value: "fan", name: "Fan User", team: "KCB Rugby" },
];

export default function LoginPage() {
	const [selectedRole, setSelectedRole] = useState<UserRole>("coach");
	const { login } = useAuth();
	const router = useRouter();

	const handleLogin = async () => {
		const user = roleOptions.find((option) => option.value === selectedRole);
		if (user) {
			login({ id: `${user.value}-1`, name: user.name, role: user.value, team: user.team });
			await new Promise((resolve) => setTimeout(resolve, 100));
			router.push(`/${user.value}`);
		}
	};

	return (
		<main className="min-h-screen bg-white px-4 py-12 text-slate-900 flex items-center justify-center">
			<div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
				<div className="text-center space-y-4">
					<img
						src="https://www.kru.co.ke/logo-lion.svg"
						alt="Kenya Rugby Union"
						className="mx-auto h-20 w-20 object-contain"
					/>
					<h1 className="brand-blend text-3xl font-black">Kenya Rugby Analytics</h1>
					<p className="text-sm text-slate-600">Select your role to continue</p>
				</div>

				<div className="space-y-3">
					<select
						value={selectedRole}
						onChange={(e) => setSelectedRole(e.target.value as UserRole)}
						className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition hover:border-slate-300 focus:border-emerald-500"
					>
						{roleOptions.map((option) => (
							<option key={option.value} value={option.value} className="bg-white text-slate-900">
								{option.label}
							</option>
						))}
					</select>

					<button
						onClick={handleLogin}
						className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700"
					>
						Continue
					</button>
				</div>
			</div>
		</main>
	);
}
