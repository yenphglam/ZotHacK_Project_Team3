export function HousingGuide() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="mb-2 font-bold">UC Irvine Housing Assistant</h2>
        <p className="text-gray-600">
          Ask me anything about finding housing near UCI campus 🏠
        </p>
      </div>

      {/* Full Height Chatbot */}
      <div className="w-full border-2 rounded-lg overflow-hidden" style={{ height: '750px' }}>
        <iframe
          src="https://creator.zotgpt.uci.edu/mychatbots/0KeFTJGFKvZmRrUP9iV4iE6r8CvRSnXzrNSr/chat"
          width="100%"
          height="100%"
          frameBorder="0"
          title="UCI Housing Assistant Chatbot"
          className="w-full h-full"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
