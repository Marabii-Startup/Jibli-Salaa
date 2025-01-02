"use client";
import { useEffect, useState } from "react";
import useUsersInfo from "@/hooks/useUsersInfo";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import ContactForm from "./components/ContactForm";
import { useSearchParams, useRouter } from "next/navigation";

interface ContactInfo {
  orderId: string;
  recipientId: string;
}

export default function Contact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userInfo: UserInfo | undefined = useUsersInfo("", () =>
    alert("Something went wrong, please refresh the page")
  );
  const [selectedContact, setSelectedContact] = useState<ContactInfo>();
  const recipientId = searchParams.get("recipientId") || "";

  useEffect(() => {
    if (recipientId && userInfo?.contacts) {
      const contact = userInfo.contacts.find(
        (contact) => contact.contactId === recipientId
      );
      if (contact) {
        setSelectedContact({
          orderId: contact.orderId,
          recipientId: contact.contactId,
        });
      }
    }
  }, [recipientId, userInfo?.contacts]);

  if (!userInfo) {
    return (
      <div className="text-center text-lg font-medium p-4">Loading...</div>
    );
  }

  if (!userInfo.contacts || userInfo.contacts.length === 0) {
    return (
      <div className="text-center text-lg font-medium p-4">
        No contacts available.
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto p-4 h-full">
      <div className="w-1/4 bg-gray-100 space-y-4 overflow-y-auto min-h-screen">
        {userInfo.contacts.map((contact) => (
          <div
            key={contact.contactId}
            className="flex justify-between items-center p-2 bg-gray-200 rounded-lg shadow"
          >
            <p className="text-gray-900">{contact.contactName}</p>
            <button
              onClick={() => {
                router.push(`/contact/?recipientId=${contact.contactId}`);
                setSelectedContact({
                  orderId: contact.orderId,
                  recipientId: contact.contactId,
                });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Message {contact.contactName}
            </button>
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4">
        {selectedContact ? (
          <ContactForm
            orderId={selectedContact.orderId}
            recipientId={selectedContact.recipientId}
          />
        ) : (
          <div className="text-center text-lg font-medium">
            Select a contact to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}
