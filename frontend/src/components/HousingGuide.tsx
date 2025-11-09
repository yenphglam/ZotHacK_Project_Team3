import { CheckCircle2, AlertCircle, DollarSign, FileText, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function HousingGuide() {
  

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">UC Irvine Housing Guide</h2>
        <p className="text-gray-600">
          Everything you need to know about finding and securing housing near UCI campus
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important for UCI Students</AlertTitle>
        <AlertDescription>
          Start your housing search 3-4 months before you need to move in. On-campus housing and popular Irvine apartments fill up quickly, especially for fall quarter!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Popular UCI Housing Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>On-Campus Housing</strong></p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Mesa Court - Traditional residence halls, great for freshmen</li>
                <li>Middle Earth - Themed residential community near ARC</li>
                <li>Campus Village - Apartment-style for continuing students</li>
                <li>Arroyo Vista - 4-bedroom apartments, popular with upperclassmen</li>
              </ul>
            </div>
            <div>
              <p className="mb-2"><strong>Near Campus (Walking/Biking Distance)</strong></p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Verano Place - Very close to campus, shuttle available</li>
                <li>Orchard Hills - UCI graduate housing</li>
                <li>University Town Center (UTC) - Shopping and housing nearby</li>
              </ul>
            </div>
            <div>
              <p className="mb-2"><strong>Nearby Neighborhoods</strong></p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Turtle Rock - Residential area, 2-3 miles from UCI</li>
                <li>University Park - Close to campus, popular with students</li>
                <li>Costa Mesa - More affordable options, 4-5 miles away</li>
                <li>Newport Beach - Beach proximity, higher rent</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>When should I start looking for housing at UCI?</AccordionTrigger>
              <AccordionContent>
                For UCI students, start your housing search 3-4 months before your desired move-in date. For fall quarter, begin looking in early summer (May-June). On-campus housing applications typically open in spring. Off-campus apartments near UCI fill up quickly, especially in areas like Verano Place and UTC, so apply early!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What should I look for during a property tour?</AccordionTrigger>
              <AccordionContent>
                Check the condition of appliances, plumbing, heating/cooling systems, locks, and windows. Look for signs of mold, pests, or water damage. Test water pressure and electrical outlets. Ask about parking, laundry facilities, and trash disposal. Take photos and notes during your visit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How much should I budget for housing near UCI?</AccordionTrigger>
              <AccordionContent>
                UCI housing costs vary by location. On-campus housing: $1,100-1,500/month. Near campus (Verano, UTC): $1,400-1,900/month. Irvine apartments: $1,200-2,000/month for shared housing. Costa Mesa offers more affordable options at $1,000-1,500/month. Remember to budget for utilities (electricity, water, internet), renter's insurance, and a security deposit. Many UCI apartments include some utilities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What's included in a typical lease?</AccordionTrigger>
              <AccordionContent>
                A lease should include: rent amount and due date, lease term dates, security deposit amount, maintenance responsibilities, pet policies, subletting rules, and conditions for lease termination. Always read the entire lease carefully before signing and ask questions about anything unclear.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I find compatible roommates at UCI?</AccordionTrigger>
              <AccordionContent>
                Use our roommate finder to connect with fellow Anteaters who share your preferences. You can also check UCI's off-campus housing Facebook groups and the UCI Housing Portal. Discuss important topics upfront: cleanliness standards, noise levels during midterms/finals, guest policies, sharing costs, and sleep schedules. Consider creating a roommate agreement to clarify expectations and prevent conflicts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What transportation options are available near UCI?</AccordionTrigger>
              <AccordionContent>
                UCI students have several transportation options: UCI shuttle system (free for students), OCTA bus routes (discounted student passes), biking (UCI has excellent bike paths), and the Anteater Express. Many off-campus apartments offer their own shuttle services to campus. If living in Costa Mesa or Newport Beach, having a car or reliable public transit access is recommended.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>What are my rights as a tenant in California?</AccordionTrigger>
              <AccordionContent>
                As a California tenant, you have the right to: a habitable living space, privacy (landlords must give 24-hour notice before entering), protection from discrimination, and the return of your security deposit within 21 days (minus legitimate deductions). Your landlord must maintain essential services and make necessary repairs in a timely manner. California has strong tenant protection laws.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moving Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Set up utilities (electricity, water, internet) at least 2 weeks before move-in</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Purchase renter's insurance to protect your belongings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Document existing damage with photos before moving in</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Update your address with UCI Student Services, bank, and important services</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Get your UCI parking permit if needed (apply early, spots fill up fast!)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Exchange contact information with roommates and landlord</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Review and understand your lease terms before signing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
