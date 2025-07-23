import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Home,
  Bath,
  Bed,
  Square,
  Share2,
  Send,
  ChevronLeft,
  ChevronRight,
  Eye,
  Phone,
  Mail,
  Building,
  Car,
  Shield,
  Zap,
  Droplets,
  Wifi,
  Camera,
  TreePine,
  Sofa,
  Maximize,
} from "lucide-react"
import { toast } from "sonner"
import { getPropertyBYIDAPI, } from "@/service/operations/property" // Using mock API
import {  createContactAPI } from "@/service/operations/contact" // Using mock API
import { useParams } from "react-router-dom"

interface Property {
  _id: string
  title: string
  location: string
  price: string
  type: string
  description: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  floors?: number
  parking?: number
  furnished?: string
  plotType?: string
  createdAt: string
  views: number
  images?: { url: string; public_id: string }[]
  image?: string // Fallback for single image
  vendor?: {
    name: string
    company: string
    phone: string
    email: string
  }
}

export default function PropertyDetailsPage() {
  const { id } = useParams()

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await getPropertyBYIDAPI(id)
        if (response) {
          setProperty(response)
        } else {
          toast.error("Property not found")
       
        }
      } catch (error) {
        console.error("Error fetching property:", error)
        toast.error("Failed to load property details")
   
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchProperty()
    }
  }, [id,])

  const isResidentialType = (type?: string) => {
    return ["apartment", "villa", "buying-a-home", "renting-a-home", "house", "condo", "townhouse"].includes(
      type?.toLowerCase() || "",
    )
  }

  const isCommercialType = (type?: string) => {
    return ["commercial"].includes(type?.toLowerCase() || "")
  }

  const isPlotType = (type?: string) => {
    return ["plot"].includes(type?.toLowerCase() || "")
  }

  const renderPropertyStats = () => {
    if (!property) return null
    if (isResidentialType(property.type)) {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bed className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.bedrooms || "N/A"}</div>
            <div className="text-sm text-gray-600">Bedrooms</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bath className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.bathrooms || "N/A"}</div>
            <div className="text-sm text-gray-600">Bathrooms</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.area || "N/A"}</div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{property.type || "N/A"}</div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
        </>
      )
    } else if (isCommercialType(property.type)) {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Building className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.floors || "N/A"}</div>
            <div className="text-sm text-gray-600">Floors</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Car className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.parking || "N/A"}</div>
            <div className="text-sm text-gray-600">Parking</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.area || "N/A"}</div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sofa className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{property.furnished || "Not Specified"}</div>
            <div className="text-sm text-gray-600">Furnished</div>
          </div>
        </>
      )
    } else if (isPlotType(property.type)) {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TreePine className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{property.plotType || "Residential"}</div>
            <div className="text-sm text-gray-600">Plot Type</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.area || "N/A"}</div>
            <div className="text-sm text-gray-600">Plot Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{property.type || "N/A"}</div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{property.area || "N/A"}</div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-6 h-6 text-gray-700" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{property.type || "N/A"}</div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
        </>
      )
    }
  }

  const renderPropertySummary = () => {
    if (!property) return null
    if (isResidentialType(property.type)) {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.bedrooms || 0} BHK
          </span>
          <span className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms || 0} Bath
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      )
    } else if (isCommercialType(property.type)) {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {property.floors || 0} Floors
          </span>
          <span className="flex items-center">
            <Car className="w-4 h-4 mr-1" />
            {property.parking || 0} Parking
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      )
    } else if (isPlotType(property.type)) {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <TreePine className="w-4 h-4 mr-1" />
            {property.plotType || "Residential"} Plot
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      )
    }
  }

  const getPropertyImages = () => {
    if (property?.images && Array.isArray(property.images) && property.images.length > 0) {
      return property.images
    }
    if (property?.image) {
      return [{ url: property.image, public_id: "main" }]
    }
    return [
      {
        url: "/placeholder.svg?height=600&width=800&text=Property+Image",
        public_id: "placeholder",
      },
    ]
  }
  const propertyImages = getPropertyImages()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields")
      return
    }
    if (!property || !property.vendor) {
      toast.error("Property or vendor information is missing")
      return
    }
    try {
      setIsSubmitting(true)
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        property,
      }
      const response = await createContactAPI(contactData)
      if (response) {
        toast.success("Inquiry sent successfully! We'll contact you soon.")
        setIsModalOpen(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        toast.error("Failed to send inquiry. Please try again.")
      }
    } catch (error) {
      console.error("Error sending inquiry:", error)
      toast.error("Failed to send inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Property link copied to clipboard!")
    }
  }

  const handleCall = () => {
    if (property?.vendor?.phone) {
      window.location.href = `tel:${property.vendor.phone}`
    } else {
      toast.error("Phone number not available")
    }
  }

  const handleEmail = () => {
    if (property?.vendor?.email) {
      window.location.href = `mailto:${property.vendor.email}?subject=Inquiry about ${property.title}`
    } else {
      toast.error("Email address not available")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Button onClick={() => router.push("/properties")} size="lg">
            Go Back to Properties
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Navigation Header (simplified) */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-end">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative">
        <Dialog open={isImageZoomOpen} onOpenChange={setIsImageZoomOpen}>
          <DialogTrigger asChild>
            <div className="relative h-[70vh] overflow-hidden bg-gray-900 cursor-pointer group">
              <img
                src={
                  propertyImages[currentImageIndex]?.url || "/placeholder.svg?height=600&width=800&text=Property+Image"
                }
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=600&width=800&text=Image+Not+Available"
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize className="w-12 h-12 text-white" />
              </div>
              {/* Image Navigation */}
              {propertyImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span className="text-sm">
                  {currentImageIndex + 1} / {propertyImages.length}
                </span>
              </div>
              {/* Property Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="max-w-7xl mx-auto">
                  <div className="text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{property.title}</h1>
                    <p className="text-xl mb-3 flex items-center opacity-90">
                      <MapPin className="w-5 h-5 mr-2" />
                      {property.location}
                    </p>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="text-3xl md:text-4xl font-bold text-green-400">{property.price}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 capitalize">
                        {property.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden p-0">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={
                  propertyImages[currentImageIndex]?.url || "/placeholder.svg?height=800&width=1200&text=Property+Image"
                }
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=800&width=1200&text=Image+Not+Available"
                }}
              />
              {propertyImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span className="text-sm">
                  {currentImageIndex + 1} / {propertyImages.length}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Thumbnails */}
        {propertyImages.length > 1 && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image.url || "/placeholder.svg?height=80&width=96&text=Thumbnail"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=80&width=96&text=Thumb"
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats - Conditional based on property type */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{renderPropertyStats()}</div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description || "No description available for this property."}
                </p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: Car, label: "Parking Space", available: true },
                    { icon: Shield, label: "24/7 Security", available: true },
                    { icon: Zap, label: "Power Backup", available: true },
                    { icon: Droplets, label: "Water Supply", available: true },
                    { icon: Wifi, label: "Internet Ready", available: true },
                    { icon: Building, label: "Elevator", available: true },
                    { icon: TreePine, label: "Garden Area", available: false },
                    { icon: Sofa, label: "Furnished", available: false },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="font-medium text-gray-900">{feature.label}</span>
                      {feature.available ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" aria-label="Available"></div>
                      ) : (
                        <div className="w-2 h-2 bg-red-500 rounded-full ml-auto" aria-label="Not available"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact & Details */}
          <div className="space-y-6">
            {/* Contact Vendor */}
            <Card className="shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {property.vendor?.name?.charAt(0) || "A"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{property.vendor?.name || "Property Agent"}</h4>
                    <p className="text-gray-600">{property.vendor?.company || "Real Estate Professional"}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Inquiry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Property Inquiry</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Property Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                          <div className="flex items-start space-x-4">
                            <img
                              src={propertyImages[0]?.url || "/placeholder.svg?height=80&width=80&text=Property"}
                              alt={property.title}
                              className="w-20 h-20 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=80&width=80&text=Property"
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{property.title}</h4>
                              <p className="text-gray-600 flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.location}
                              </p>
                              <p className="text-xl font-bold text-green-600 mt-2">{property.price}</p>
                              {renderPropertySummary()}
                            </div>
                          </div>
                        </div>
                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name *</Label>
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Any specific questions or requirements..."
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={4}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="flex space-x-3 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsModalOpen(false)}
                              className="flex-1"
                              disabled={isSubmitting}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Inquiry
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={handleCall}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleEmail}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">{property.type || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Listed On</span>
                    <span className="font-medium">
                      {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-medium">#{property._id?.slice(-6).toUpperCase() || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      Views
                    </span>
                    <span className="font-medium">{property.views || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
