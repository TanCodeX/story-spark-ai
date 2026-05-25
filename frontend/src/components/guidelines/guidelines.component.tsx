const GuidelinesComponent = () => {
  const sections = [
    {
      title: "Respect the Community",
      icon: "🌍",
      color: "from-blue-500 to-cyan-500",
      items: [
        "Be respectful, supportive, and constructive in every interaction.",
        "Harassment, hate speech, discrimination, or bullying will not be tolerated.",
        "Encourage creativity by giving meaningful feedback and appreciation.",
        "Avoid spam, misleading promotions, or disruptive behavior.",
      ],
    },
    {
      title: "Create Original Content",
      icon: "📚",
      color: "from-purple-500 to-pink-500",
      items: [
        "Publish original stories, prompts, and ideas whenever possible.",
        "Always credit inspirations, collaborations, or referenced content.",
        "Do not plagiarize, repost stolen work, or violate copyrights.",
        "Keep content safe, legal, and appropriate for the platform audience.",
      ],
    },
    {
      title: "Use AI Responsibly",
      icon: "🤖",
      color: "from-green-500 to-emerald-500",
      items: [
        "Review AI-generated content before publishing publicly.",
        "Do not use AI for misinformation, impersonation, or harmful content.",
        "Disclose AI assistance where transparency is expected.",
        "AI should enhance creativity — not replace accountability.",
      ],
    },
    {
      title: "Write Better Stories",
      icon: "✍️",
      color: "from-orange-500 to-yellow-500",
      items: [
        "Use detailed prompts with genre, tone, characters, and setting.",
        "Refine prompts through iterations to improve story quality.",
        "Keep characters consistent and dialogues natural.",
        "Focus on emotion, pacing, and immersive storytelling.",
      ],
    },
    {
      title: "Contribute Professionally",
      icon: "⚡",
      color: "from-pink-500 to-rose-500",
      items: [
        "Follow the Code of Conduct in all collaborations.",
        "Discuss major features before starting implementation.",
        "Keep pull requests clean, focused, and documented.",
        "Write clear commit messages and test your changes properly.",
      ],
    },
    {
      title: "Protect Privacy & Security",
      icon: "🔒",
      color: "from-indigo-500 to-violet-500",
      items: [
        "Never share personal, private, or sensitive information.",
        "Respect platform privacy policies and user data.",
        "Report vulnerabilities responsibly instead of exploiting them.",
        "Keep passwords, tokens, and API keys secure at all times.",
      ],
    },
  ];

  return (
    <div className="bg-[#0a0f1e] min-h-screen text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">Guidelines</h1>
        <p className="text-gray-400 text-lg mb-12">
          Community rules, writing tips, and AI usage policies for Story Spark AI.
        </p>

        {/* Community Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            📖 Community & Writing Guidelines
          </h2>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Be respectful and constructive in all interactions.</li>
            <li>Do not plagiarize — all stories must be original.</li>
            <li>Keep content appropriate for the platform's audience.</li>
            <li>Give credit when building on others' ideas or prompts.</li>
          </ul>
        </section>

        {/* AI Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            🤖 AI Usage & Content Safety
          </h2>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>AI-generated content must be reviewed before publishing.</li>
            <li>Do not use AI to generate harmful or misleading content.</li>
            <li>Disclose AI assistance when sharing stories publicly.</li>
          </ul>
        </section>

        {/* Storytelling Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            ✍️ Tips for Better Storytelling & Prompts
          </h2>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Be specific in your prompts — vague inputs give vague stories.</li>
            <li>Set the scene: include genre, tone, and character details.</li>
            <li>Iterate — refine your story through multiple prompt rounds.</li>
          </ul>
        </section>

        {/* Contribution Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            🤝 Contribution Rules
          </h2>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Follow the project's Code of Conduct at all times.</li>
            <li>Open an issue before starting work on a new feature.</li>
            <li>Keep PRs focused — one feature or fix per PR.</li>
            <li>Write clear commit messages describing what you changed.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default GuidelinesComponent;
