import Image from "next/image";

const latestNews = [
  {
    date: "12 MAY 2024",
    title: "Kenya Sevens qualify for Paris 2024 Olympics",
    summary: "Team performance, selection, and preparation updates from the latest camp.",
  },
  {
    date: "10 MAY 2024",
    title: "Sinba XV squad named for Pacific Nations Cup",
    summary: "Full roster and tactical notes ahead of the weekend fixture.",
  },
  {
    date: "7 MAY 2024",
    title: "KRU launches National Talent Academy",
    summary: "A new pathway for youth players moving into elite rugby systems.",
  },
];

const fixtures = [
  { date: "25 MAY", opponent: "Samoa", stage: "Pacific Nations Cup", venue: "Nyayo National Stadium, Nairobi" },
  { date: "01 JUN", opponent: "Tonga", stage: "Pacific Nations Cup", venue: "Nyayo National Stadium, Nairobi" },
  { date: "08 JUN", opponent: "Fiji", stage: "Pacific Nations Cup", venue: "Nyayo National Stadium, Nairobi" },
];

const links = ["Home", "News", "Fixtures & Results", "Teams", "Results", "About KRU", "Get Involved", "Shop"];

const highlights = [
  { title: "Join the family", copy: "Become a member and support rugby nationwide." },
  { title: "Play rugby", copy: "Find a club or register to play rugby today." },
  { title: "Volunteer", copy: "Help grow the game in your community." },
  { title: "Shop Kenya", copy: "Official KRU merchandise for fans and players." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 bg-white/5">
              <Image src="/home-hero.svg" alt="Kenya Rugby Union" width={34} height={34} className="h-8 w-8" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/65">Kenya Rugby Union</div>
              <div className="text-sm font-bold tracking-[0.18em] text-white">One Nation. One Team. One Pride.</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/80 xl:flex">
            {links.map((link, index) => (
              <a key={link} href="#" className={`transition hover:text-white ${index === 0 ? "text-red-400" : ""}`}>
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-red-500"
          >
            Join the family
          </a>
        </div>
      </header>

      <section className="hero-banner relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-35 subtle-texture" aria-hidden="true" />
        <div className="mx-auto grid min-h-[760px] w-full max-w-[1600px] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:px-8 lg:py-16">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white/55">Official rugby platform</p>
              <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-[5.5rem]">
                <span className="block text-white">One Nation.</span>
                <span className="block text-red-500">One Team.</span>
                <span className="block text-emerald-500">One Pride.</span>
              </h1>
              <p className="max-w-lg text-base leading-7 text-white/75 sm:text-lg">
                Proudly Kenyan. Fiercely competitive. Always forward.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#news" className="inline-flex items-center rounded-sm bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition hover:bg-red-500">
                Latest news
              </a>
              <a href="#fixtures" className="inline-flex items-center rounded-sm border border-white/25 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition hover:bg-white/10">
                Shop Kenya
              </a>
            </div>
          </div>

          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[920px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_72%_42%,rgba(200,31,31,0.32),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(115deg,transparent_0%,transparent_40%,rgba(200,31,31,0.34)_40%,rgba(200,31,31,0.18)_58%,rgba(17,131,74,0.32)_58%,rgba(17,131,74,0.2)_76%,transparent_76%)] opacity-90" />
              <Image
                src="/home-hero.svg"
                alt="Kenya rugby hero image with players on the right"
                width={1200}
                height={900}
                priority
                className="relative z-10 h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="bg-white text-slate-900">
        <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-black uppercase tracking-[-0.03em]">Latest news</h2>
              <a href="#" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                View all news →
              </a>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="relative overflow-hidden rounded-2xl bg-black text-white shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.9))]" />
                <Image src="/home-hero.svg" alt="Featured news" width={900} height={700} className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="inline-flex rounded-sm bg-red-600 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">Featured</div>
                  <div className="mt-3 text-sm text-white/65">12 MAY 2024</div>
                  <h3 className="mt-2 max-w-md text-2xl font-bold leading-tight">Kenya Sevens qualify for Paris 2024 Olympics</h3>
                  <a href="#" className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-white">
                    Read more →
                  </a>
                </div>
              </article>

              <div className="space-y-3">
                {latestNews.slice(1).map((item) => (
                  <article key={item.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-black">
                      <Image src="/home-hero.svg" alt={item.title} width={120} height={120} className="h-full w-full object-cover opacity-80" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-500">{item.date}</div>
                      <h3 className="mt-1 text-sm font-bold leading-snug text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{item.summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div id="fixtures" className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-black uppercase tracking-[-0.03em]">Upcoming fixtures</h2>
              <a href="#" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                View all fixtures →
              </a>
            </div>
            <div className="space-y-3">
              {fixtures.map((fixture) => (
                <article key={`${fixture.date}-${fixture.opponent}`} className="grid grid-cols-[84px_1fr_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 py-3 text-center">
                    <div className="text-2xl font-black leading-none text-slate-900">{fixture.date.split(" ")[0]}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{fixture.date.split(" ")[1]}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{fixture.stage}</div>
                    <div className="mt-1 text-lg font-bold text-slate-900">Kenya vs {fixture.opponent}</div>
                    <div className="text-sm text-slate-500">{fixture.venue}</div>
                  </div>
                  <a href="#" className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-50">
                    Tickets
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black">
        <div className="mx-auto grid w-full max-w-[1600px] gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {highlights.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
              <div className={`text-sm font-bold uppercase tracking-[0.22em] ${index === 0 ? "text-red-400" : index === 1 ? "text-emerald-400" : index === 2 ? "text-white" : "text-sky-400"}`}>
                {item.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/75">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr] lg:px-8">
          <div>
            <div className="text-2xl font-black uppercase tracking-[0.2em]">Kenya Rugby Union</div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
              The official home of Kenya rugby. Uniting communities, developing talent, inspiring a nation.
            </p>
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">Quick links</div>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>Teams</li>
              <li>Governance</li>
              <li>News</li>
              <li>Safe Rugby</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">Follow us</div>
            <div className="mt-3 flex gap-3 text-white/65">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15">f</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15">ig</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15">x</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15">yt</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">Newsletter</div>
            <p className="mt-3 text-sm leading-6 text-white/65">Stay up to date with the latest news and updates.</p>
            <div className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
              <input className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Enter your email" />
              <button className="bg-red-600 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white">Go</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
