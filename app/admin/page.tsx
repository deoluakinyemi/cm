import FindFormIds from "@/components/find-form-ids"

export default function AdminPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Tools</h1>
        <FindFormIds />

        <div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">How to Find Google Form Entry IDs</h2>

          <div className="space-y-4 text-gray-700">
            <p>
              To properly connect your form to Google Forms, you need to find the correct entry IDs for each field.
              Here's how to do it manually:
            </p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>Open your Google Form in a browser</li>
              <li>Right-click anywhere on the page and select "View Page Source" (or press Ctrl+U)</li>
              <li>Press Ctrl+F to open the search function</li>
              <li>Search for "entry." (including the period)</li>
              <li>You'll find entry IDs like "entry.1234567890" for each field</li>
              <li>
                Map these IDs to your form fields:
                <ul className="list-disc pl-5 mt-2">
                  <li>First entry ID → Full Name</li>
                  <li>Second entry ID → Phone Number</li>
                  <li>Third entry ID → Email Address</li>
                  <li>Fourth entry ID → City & LGA</li>
                  <li>Fifth entry ID → Investment Range</li>
                </ul>
              </li>
              <li>
                Replace the placeholder IDs in the code with the actual ones:
                <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto text-sm">
                  formUrl.searchParams.append("entry.1234567890", values.fullName);
                  <br />
                  formUrl.searchParams.append("entry.1234567891", values.phone);
                  <br />
                  formUrl.searchParams.append("entry.1234567892", values.email);
                  <br />
                  formUrl.searchParams.append("entry.1234567893", values.location);
                  <br />
                  formUrl.searchParams.append("entry.1234567894", values.investmentRange);
                </pre>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
