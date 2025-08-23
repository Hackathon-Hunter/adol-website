"use client";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { MessageCircle, Mail, Phone, FileText, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface SupportTicket {
	id: string;
	subject: string;
	status: "open" | "in-progress" | "resolved";
	priority: "low" | "medium" | "high";
	createdAt: string;
}

export default function SupportPage() {
	const [activeTab, setActiveTab] = useState<"help" | "contact" | "tickets">("help");
	const [tickets] = useState<SupportTicket[]>([
		{
			id: "TKT-001",
			subject: "Issue with product listing",
			status: "in-progress",
			priority: "medium",
			createdAt: "2025-08-23"
		},
		{
			id: "TKT-002",
			subject: "Payment processing error",
			status: "resolved",
			priority: "high",
			createdAt: "2025-08-22"
		}
	]);

	const [contactForm, setContactForm] = useState({
		subject: "",
		category: "general",
		priority: "medium",
		message: ""
	});

	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Support ticket submitted:", contactForm);
		alert("Support ticket submitted successfully!");
		setContactForm({ subject: "", category: "general", priority: "medium", message: "" });
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "open":
				return <Clock className="w-4 h-4 text-yellow-500" />;
			case "in-progress":
				return <AlertCircle className="w-4 h-4 text-blue-500" />;
			case "resolved":
				return <CheckCircle className="w-4 h-4 text-green-500" />;
			default:
				return <Clock className="w-4 h-4 text-gray-500" />;
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "text-red-600 bg-red-100";
			case "medium":
				return "text-yellow-600 bg-yellow-100";
			case "low":
				return "text-green-600 bg-green-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	return (
		<MainLayout>
			<div className="p-6 bg-gray-50 min-h-screen">
				<div className="max-w-4xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
						<p className="text-gray-600">Get help and support for your ADOL experience</p>
					</div>					{/* Tab Navigation */}
					<div className="flex border-b border-gray-200 mb-6">
						<button
							onClick={() => setActiveTab("help")}
							className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === "help"
								? "border-purple-500 text-purple-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
								}`}
						>
							Help & FAQ
						</button>
						<button
							onClick={() => setActiveTab("contact")}
							className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === "contact"
								? "border-purple-500 text-purple-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
								}`}
						>
							Contact Support
						</button>
					</div>

					{/* Help & FAQ Tab */}
					{activeTab === "help" && (
						<div className="space-y-6">
							<div className="grid md:grid-cols-3 gap-6 mb-8">
								<div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center mb-4">
										<FileText className="w-8 h-8 text-purple-500 mr-3" />
										<h3 className="text-lg font-semibold">Getting Started</h3>
									</div>
									<p className="text-gray-600 mb-4">Learn the basics of using ADOL platform</p>
									<button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
										Read Guide <ArrowRight className="w-4 h-4 ml-1" />
									</button>
								</div>

								<div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center mb-4">
										<MessageCircle className="w-8 h-8 text-blue-500 mr-3" />
										<h3 className="text-lg font-semibold">Product Listings</h3>
									</div>
									<p className="text-gray-600 mb-4">How to create and manage your product listings</p>
									<button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
										Learn More <ArrowRight className="w-4 h-4 ml-1" />
									</button>
								</div>

								<div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center mb-4">
										<Phone className="w-8 h-8 text-green-500 mr-3" />
										<h3 className="text-lg font-semibold">Payments & Credits</h3>
									</div>
									<p className="text-gray-600 mb-4">Understanding credits and payment processing</p>
									<button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
										View Details <ArrowRight className="w-4 h-4 ml-1" />
									</button>
								</div>
							</div>

							<div className="bg-white rounded-lg border border-gray-200 p-6">
								<h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
								<div className="space-y-4">
									<details className="group">
										<summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
											<span className="font-medium">How do I create a product listing?</span>
											<ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
										</summary>
										<div className="mt-3 p-3 text-gray-600">
											You can create a product listing by uploading an image of your product. Our AI will analyze the image and generate a complete listing for you, including pricing suggestions and descriptions.
										</div>
									</details>

									<details className="group">
										<summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
											<span className="font-medium">How does the credit system work?</span>
											<ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
										</summary>
										<div className="mt-3 p-3 text-gray-600">
											Credits are used to generate AI-powered product listings. Each listing creation consumes a certain number of credits. You can purchase more credits from the Credits page.
										</div>
									</details>

									<details className="group">
										<summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
											<span className="font-medium">Can I edit my product listings?</span>
											<ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
										</summary>
										<div className="mt-3 p-3 text-gray-600">
											Yes, you can edit your product listings at any time from the Products page. You can modify descriptions, pricing, and other details as needed.
										</div>
									</details>

									<details className="group">
										<summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
											<span className="font-medium">How do I get support for technical issues?</span>
											<ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
										</summary>
										<div className="mt-3 p-3 text-gray-600">
											You can submit a support ticket through the Contact Support tab above, or email us directly at support@adol.app for urgent issues.
										</div>
									</details>
								</div>
							</div>
						</div>
					)}

					{/* Contact Support Tab */}
					{activeTab === "contact" && (
						<div className="max-w-2xl">
							<div className="bg-white rounded-lg border border-gray-200 p-6">
								<h2 className="text-xl font-semibold mb-4">Submit a Support Ticket</h2>
								<form onSubmit={handleContactSubmit} className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Subject *
										</label>
										<input
											type="text"
											required
											value={contactForm.subject}
											onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
											placeholder="Brief description of your issue"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Category
											</label>
											<select
												value={contactForm.category}
												onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
											>
												<option value="general">General Question</option>
												<option value="technical">Technical Issue</option>
												<option value="billing">Billing & Credits</option>
												<option value="product">Product Listings</option>
												<option value="account">Account Issues</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Priority
											</label>
											<select
												value={contactForm.priority}
												onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
											>
												<option value="low">Low</option>
												<option value="medium">Medium</option>
												<option value="high">High</option>
											</select>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Message *
										</label>
										<textarea
											required
											rows={6}
											value={contactForm.message}
											onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
											placeholder="Please describe your issue in detail..."
										/>
									</div>

									<button
										type="submit"
										className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
									>
										Submit Ticket
									</button>
								</form>
							</div>

							<div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
								<h3 className="font-medium text-blue-800 mb-2">Other Ways to Reach Us</h3>
								<div className="space-y-2 text-sm text-blue-700">
									<div className="flex items-center">
										<Mail className="w-4 h-4 mr-2" />
										<span>support@adol.app</span>
									</div>
									<div className="flex items-center">
										<Clock className="w-4 h-4 mr-2" />
										<span>Response time: 24-48 hours</span>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* My Tickets Tab */}
					{activeTab === "tickets" && (
						<div>
							<div className="bg-white rounded-lg border border-gray-200">
								<div className="p-6 border-b border-gray-200">
									<h2 className="text-xl font-semibold">Support Tickets</h2>
								</div>
								<div className="divide-y divide-gray-200">
									{tickets.map((ticket) => (
										<div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center space-x-3">
													{getStatusIcon(ticket.status)}
													<h3 className="font-medium text-gray-800">{ticket.subject}</h3>
												</div>
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
													{ticket.priority.toUpperCase()}
												</span>
											</div>
											<div className="flex items-center justify-between text-sm text-gray-600">
												<div className="flex items-center space-x-4">
													<span>#{ticket.id}</span>
													<span className="capitalize">{ticket.status.replace("-", " ")}</span>
												</div>
												<span>Created: {ticket.createdAt}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
}
