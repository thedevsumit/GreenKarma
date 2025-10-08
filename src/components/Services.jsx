import { Leaf, Recycle, Globe, ShoppingBag, Gift, Users } from "lucide-react";

export default function ServicesFeatures() {
  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-[#699451]" />,
      title: "Eco-Friendly Practices",
      desc: "We promote sustainable habits to reduce environmental impact.",
    },
    {
      icon: <Recycle className="w-10 h-10 text-[#699451]" />,
      title: "Recycling Made Simple",
      desc: "Easily manage and track your recycling efforts with Green Karma.",
    },
    {
      icon: <Globe className="w-10 h-10 text-[#699451]" />,
      title: "Global Impact",
      desc: "Every small step you take contributes to a cleaner planet.",
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-[#699451]" />,
      title: "Connect with Real Buyers",
      desc: "Easily find verified buyers who are interested in your recyclable items.",
    },
    {
      icon: <Gift className="w-10 h-10 text-[#699451]" />,
      title: "Reward System",
      desc: "Earn points and redeem exciting rewards for every eco-friendly action you take.",
    },
    {
      icon: <Users className="w-10 h-10 text-[#699451]" />,
      title: "Community Support",
      desc: "Join a growing community of users working together towards a cleaner planet.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white services relative">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-[#699451] leading-tight text-center">
          Services
        </h1>
        <p className="text-[19px] text-gray-600 mb-12 text-center py-[30px] mt-[20px]">
          "Discover how Green Karma helps you live sustainably and make an
          impact."
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4 text-[#699451]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#699451] mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-[20px]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
