import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Video, Upload, Trash2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: string;
  name: string;
  description: string | null;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Subject form
  const [subjectName, setSubjectName] = useState("");
  const [subjectDesc, setSubjectDesc] = useState("");

  // PDF form
  const [selectedSubject, setSelectedSubject] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfDesc, setPdfDesc] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Video form
  const [videoSubject, setVideoSubject] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [addingVideo, setAddingVideo] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchSubjects();
    fetchContacts();
  }, []);

  const fetchSubjects = async () => {
    const { data } = await supabase.from("subjects").select("*").order("name");
    setSubjects(data || []);
  };

  const fetchContacts = async () => {
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setContacts(data || []);
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("subjects").insert({
      name: subjectName,
      description: subjectDesc,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Subject added successfully" });
      setSubjectName("");
      setSubjectDesc("");
      fetchSubjects();
    }
  };

  const handleUploadPDF = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile || !user) return;

    setUploading(true);
    try {
      const fileExt = pdfFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(filePath, pdfFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("pdfs")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("pdfs").insert({
        subject_id: selectedSubject,
        title: pdfTitle,
        description: pdfDesc,
        file_url: publicUrl,
        file_size: pdfFile.size,
        uploaded_by: user.id,
      });

      if (dbError) throw dbError;

      toast({ title: "Success", description: "PDF uploaded successfully" });
      setPdfTitle("");
      setPdfDesc("");
      setPdfFile(null);
      setSelectedSubject("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setAddingVideo(true);
    try {
      const videoId = extractYouTubeVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      const { error } = await supabase.from("youtube_videos").insert({
        subject_id: videoSubject,
        title: videoTitle,
        description: videoDesc,
        youtube_url: youtubeUrl,
        video_id: videoId,
        added_by: user.id,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Video added successfully" });
      setVideoTitle("");
      setVideoDesc("");
      setYoutubeUrl("");
      setVideoSubject("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setAddingVideo(false);
    }
  };

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage subjects, PDFs, videos, and messages</p>
        </div>

        <Tabs defaultValue="subjects">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="pdfs">Upload PDFs</TabsTrigger>
            <TabsTrigger value="videos">Add Videos</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Add New Subject
                </CardTitle>
                <CardDescription>Create a new subject for students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSubject} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject-name">Subject Name</Label>
                    <Input
                      id="subject-name"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject-desc">Description</Label>
                    <Textarea
                      id="subject-desc"
                      value={subjectDesc}
                      onChange={(e) => setSubjectDesc(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Add Subject</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pdfs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload PDF
                </CardTitle>
                <CardDescription>Upload study materials for students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadPDF} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pdf-subject">Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pdf-title">PDF Title</Label>
                    <Input
                      id="pdf-title"
                      value={pdfTitle}
                      onChange={(e) => setPdfTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pdf-desc">Description</Label>
                    <Textarea
                      id="pdf-desc"
                      value={pdfDesc}
                      onChange={(e) => setPdfDesc(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pdf-file">PDF File</Label>
                    <Input
                      id="pdf-file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload PDF"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Add YouTube Video
                </CardTitle>
                <CardDescription>Add educational videos for students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-subject">Subject</Label>
                    <Select value={videoSubject} onValueChange={setVideoSubject} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input
                      id="video-title"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-desc">Description</Label>
                    <Textarea
                      id="video-desc"
                      value={videoDesc}
                      onChange={(e) => setVideoDesc(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube-url">YouTube URL</Label>
                    <Input
                      id="youtube-url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={addingVideo}>
                    {addingVideo ? "Adding..." : "Add Video"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Messages
                </CardTitle>
                <CardDescription>View messages from students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No messages yet</p>
                  ) : (
                    contacts.map((contact) => (
                      <Card key={contact.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <CardDescription>
                            {contact.email} • {new Date(contact.created_at).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{contact.message}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
