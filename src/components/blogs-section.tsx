
export type BlogType = {
	title: string;
	date: string;
	description: string;
	category: string;
	author?: string;
	href: string;
};

const defaultBlogs: BlogType[] = [
	{
		title: "How to Secure AI Agents: The Ultimate Guide to Cryptographic Mandates",
		date: "Mar 12 2026",
		category: "Security",
		author: "AgentTag Team",
		description:
			"Learn the exact framework for applying deterministic boundaries to autonomous AI agents, preventing unauthorized actions and securing enterprise data.",
		href: "/blog/cryptographic-mandates",
	},
	{
		title: "Why Your Autonomous AI Will Fail Without a Hash-Chained Audit Ledger",
		date: "Mar 05 2026",
		category: "Compliance",
		author: "AgentTag Team",
		description:
			"The hidden risks of untraceable agent actions. Discover why immutable, cryptographically verifiable logs are mandatory for production AI.",
		href: "/blog/hash-chained-audit-ledger",
	},
	{
		title: "Mastering the Model Context Protocol (MCP) in 2026",
		date: "Feb 22 2026",
		category: "Engineering",
		author: "AgentTag Team",
		description:
			"A comprehensive deep dive into MCP policy surfaces. Standardize secure tool access across Claude, ChatGPT, and custom LLM applications.",
		href: "/blog/mcp-policy-surfaces",
	},
	{
		title: "The Complete Guide to Step-Up Authentication for AI Workflows",
		date: "Feb 14 2026",
		category: "Platform",
		author: "AgentTag Team",
		description:
			"Stop flying blind. Implement human-in-the-loop approvals and step-up auth to safeguard high-stakes operations in your AI infrastructure.",
		href: "/blog/step-up-authentication",
	},
	{
		title: "Stop Flying Blind: Real-Time Governance for Autonomous Agents",
		date: "Jan 30 2026",
		category: "Governance",
		author: "AgentTag Team",
		description:
			"Master real-time policy engines. Ensure total compliance, security, and operational visibility across your entire deployed AI fleet.",
		href: "/blog/real-time-governance",
	},
	{
		title: "Decentralized Identity (DID) for AI: Everything You Need to Know",
		date: "Jan 18 2026",
		category: "Identity",
		author: "AgentTag Team",
		description:
			"Unlock the future of identity management. How Ed25519 DIDs and cryptographic passports provide perfect authorization for distributed AI.",
		href: "/blog/decentralized-identity-did",
	},
];

export function BlogsSection({
	blogs,
	title = "Blog",
	description = "Expert strategies and technical deep dives for securing autonomous AI.",
}: {
	blogs?: BlogType[];
	title?: string;
	description?: string;
}) {
	const displayBlogs = blogs ?? defaultBlogs;
	return (
		<div className="mx-auto w-full max-w-4xl py-16 px-4 font-sans bg-background text-foreground">
			<div className="mb-16 border-b border-border/20 pb-8">
				<h2 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
					{title}
				</h2>
				<p className="text-muted-foreground text-lg max-w-2xl">
					{description}
				</p>
			</div>

			<div className="flex flex-col">
				{displayBlogs.map((blog, idx) => (
					<BlogCard {...blog} key={idx} />
				))}
			</div>
		</div>
	);
}

function BlogCard({ title, date, description, category, href }: BlogType) {
	return (
		<a href={href} className="group block py-10 border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors px-4 -mx-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
			<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
				<div className="text-sm font-mono text-muted-foreground/70 shrink-0 sm:w-32 pt-1">{date}</div>
				<div className="space-y-3">
					<div className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60">{category}</div>
					<h3 className="text-2xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors text-balance">
						{title}
					</h3>
					<p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
						{description}
					</p>
				</div>
			</div>
		</a>
	);
}
