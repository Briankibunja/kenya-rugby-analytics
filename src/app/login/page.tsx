"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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

	useEffect(() => {
		["/admin", "/coach", "/player", "/fan"].forEach((path) => {
			router.prefetch(path);
		});
	}, [router]);

	const handleLogin = async () => {
		const user = roleOptions.find((option) => option.value === selectedRole);
		if (user) {
			login({ id: `${user.value}-1`, name: user.name, role: user.value, team: user.team });
			router.replace(`/${user.value}`);
		}
	};

	return (
			<main className="min-h-screen bg-black px-4 py-10 text-white">
				<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center gap-6">
					<div className="flex items-center justify-center rounded-[2rem] border border-white/10 bg-transparent p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8 w-full">
						<div className="w-full max-w-md space-y-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-10">
							<div className="text-center space-y-4">
								<Image
									src="https://www.kru.co.ke/logo-lion.svg"
									alt="Kenya Rugby Union"
									width={64}
									height={64}
									priority
									className="mx-auto h-16 w-16 object-contain"
								/>
								<h2 className="brand-blend text-3xl font-black uppercase tracking-[0.14em]">Kenya Rugby Analytics</h2>
								<p className="text-sm text-white/60">Select your role to continue</p>
							</div>

							<div className="space-y-3">
								<select
									value={selectedRole}
									onChange={(e) => setSelectedRole(e.target.value as UserRole)}
									className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition hover:border-white/20 focus:border-red-500"
								>
									{roleOptions.map((option) => (
										<option key={option.value} value={option.value} className="bg-black text-white">
											{option.label}
										</option>
									))}
								</select>

								<button
									onClick={handleLogin}
									className="w-full rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-emerald-600 px-4 py-3 font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
								>
									Continue
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
	);
}
