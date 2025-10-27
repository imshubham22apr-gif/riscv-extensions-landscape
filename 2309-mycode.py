import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, MessageCircle, Bell, Shield } from "lucide-react";

export default function HealthChatbotLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          className="text-5xl font-bold mb-6 text-blue-700"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AI-Powered Public Health Chatbot
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Multilingual chatbot to spread disease awareness, provide vaccination
          schedules, and deliver real-time outbreak alerts. Accessible via
          WhatsApp and SMS for rural and semi-urban communities.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="bg-blue-600 text-white rounded-2xl px-6">
            Try Demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl px-6 border-blue-600 text-blue-600"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-4 gap-6 px-8 py-16 max-w-6xl mx-auto">
        {[
          {
            icon: <Globe className="h-10 w-10 text-blue-600" />,
            title: "Multilingual Support",
            desc: "Communicate in local languages, including regional dialects and transliterated text.",
          },
          {
            icon: <MessageCircle className="h-10 w-10 text-blue-600" />,
            title: "Accessible Everywhere",
            desc: "Use WhatsApp or SMS to get reliable health information, even on basic phones.",
          },
          {
            icon: <Bell className="h-10 w-10 text-blue-600" />,
            title: "Real-time Alerts",
            desc: "Receive immediate outbreak notifications tailored to your district or region.",
          },
          {
            icon: <Shield className="h-10 w-10 text-blue-600" />,
            title: "Safe & Verified",
            desc: "Powered by government health databases with privacy and safety at the core.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <CardContent className="flex flex-col items-center text-center">
                {f.icon}
                <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Outcome Section */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Impact You Can Measure
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: "80%", label: "Answer Accuracy" },
            { value: "+20%", label: "Awareness Growth" },
            { value: "100K+", label: "People Reached" },
          ].map((stat, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-md p-8 bg-white"
            >
              <h3 className="text-4xl font-bold text-blue-600">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Join the Movement for Better Health
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Empower communities with accessible healthcare knowledge. Partner
          with us to bring this solution to scale.
        </p>
        <Button size="lg" className="bg-blue-600 text-white rounded-2xl px-6">
          Get Started
        </Button>
      </section>
    </div>
  );
}
