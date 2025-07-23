import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { getInquiryAPI } from "../service/operations/inquiry";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyType: string;
  createdAt: string;
  updatedAt: string;
}

const GetInquiry = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth?.user ?? null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.text("Customer Inquiries", 14, 10);

    // Table data
    const tableColumn = [
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Property Type",
      "Date",
    ];
    const tableRows = inquiries.map((inquiry) => [
      inquiry.name,
      inquiry.email,
      inquiry.phone,
      inquiry.subject,
      inquiry.message,
      inquiry.propertyType,
      new Date(inquiry.createdAt).toLocaleString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("inquiries.pdf");
  };
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const data = await getInquiryAPI();
        setInquiries(data);
      } catch (err) {
        setError("Failed to fetch inquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading inquiries...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700">
        <p>{error}</p>
      </div>
    );
  }
  if (!user?.isInquiry && user?.role !== "vendor") {
    return (
      <div className="text-red-600 text-center p-4 font-semibold">
        You do not have permission to view this page.
      </div>
    );
  }

  return (
    <Card className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 bg-white rounded-md shadow-sm">
        <div>
          <CardTitle className="text-lg md:text-xl font-semibold">
            Inquiries
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Manage and view all customer inquiries
          </CardDescription>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry._id}>
                    <TableCell className="font-medium">
                      {inquiry.name}
                    </TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.phone}</TableCell>
                    <TableCell>{inquiry.subject}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {inquiry.message}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{inquiry.propertyType}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {formatDistanceToNow(new Date(inquiry.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default GetInquiry;
