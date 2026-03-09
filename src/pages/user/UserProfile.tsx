import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Phone, Mail, MapPin, Edit, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import type { Address } from "@/context/AuthContext";

const UserProfile = () => {
  const { user, updateUser, addAddress, updateAddress, deleteAddress, setPrimaryAddress } = useAuth();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [addressForm, setAddressForm] = useState({
    label: "Home",
    fullAddress: "",
    isPrimary: false,
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profileForm);
    toast.success("Profile updated successfully!");
    setEditProfileOpen(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullAddress.trim()) {
      toast.error("Please enter an address");
      return;
    }
    addAddress(addressForm);
    toast.success("Address added successfully!");
    setAddressForm({ label: "Home", fullAddress: "", isPrimary: false });
    setAddAddressOpen(false);
  };

  const handleEditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress) return;
    updateAddress(selectedAddress.id, {
      label: addressForm.label,
      fullAddress: addressForm.fullAddress,
    });
    toast.success("Address updated successfully!");
    setEditAddressOpen(false);
    setSelectedAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast.success("Address deleted successfully!");
  };

  const handleSetPrimary = (id: string) => {
    setPrimaryAddress(id);
    toast.success("Primary address updated!");
  };

  const openEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setAddressForm({
      label: address.label,
      fullAddress: address.fullAddress,
      isPrimary: address.isPrimary,
    });
    setEditAddressOpen(true);
  };

  if (!user) return null;

  const primaryAddress = user.addresses?.find((a) => a.isPrimary);

  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display">Profile Information</CardTitle>
          <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Edit Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="font-body text-sm font-medium mb-1.5 block">Full Name</label>
                  <input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1.5 block">Phone Number</label>
                  <input
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
            <div>
              <h3 className="font-display text-xl font-semibold">{user.name}</h3>
              <p className="font-body text-sm text-muted-foreground">{user.role === "admin" ? "Administrator" : "Customer"}</p>
            </div>
          </div>
          <div className="grid gap-3 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span className="font-body text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span className="font-body text-sm">{user.phone || "Not provided"}</span>
            </div>
            {primaryAddress && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium">{primaryAddress.label} (Primary)</p>
                  <p className="font-body text-sm text-muted-foreground">{primaryAddress.fullAddress}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Addresses Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display">Saved Addresses</CardTitle>
          <Dialog open={addAddressOpen} onOpenChange={setAddAddressOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Add New Address</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAddress} className="space-y-4">
                <div>
                  <label className="font-body text-sm font-medium mb-1.5 block">Label</label>
                  <select
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1.5 block">Full Address</label>
                  <textarea
                    value={addressForm.fullAddress}
                    onChange={(e) => setAddressForm({ ...addressForm, fullAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                    placeholder="Enter complete address with pincode"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrimary"
                    checked={addressForm.isPrimary}
                    onChange={(e) => setAddressForm({ ...addressForm, isPrimary: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isPrimary" className="font-body text-sm">Set as primary address</label>
                </div>
                <Button type="submit" className="w-full">Add Address</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {!user.addresses || user.addresses.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground text-center py-8">No saved addresses yet</p>
          ) : (
            <div className="space-y-3">
              {user.addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 rounded-lg border ${address.isPrimary ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-body font-semibold text-sm">{address.label}</h4>
                        {address.isPrimary && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-body">
                            <Star className="w-3 h-3 fill-current" /> Primary
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm text-muted-foreground">{address.fullAddress}</p>
                    </div>
                    <div className="flex gap-1">
                      {!address.isPrimary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetPrimary(address.id)}
                          title="Set as primary"
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditAddress(address)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-display">Delete Address</AlertDialogTitle>
                            <AlertDialogDescription className="font-body">
                              Are you sure you want to delete this address? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteAddress(address.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Address Dialog */}
      <Dialog open={editAddressOpen} onOpenChange={setEditAddressOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Edit Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditAddress} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium mb-1.5 block">Label</label>
              <select
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 block">Full Address</label>
              <textarea
                value={addressForm.fullAddress}
                onChange={(e) => setAddressForm({ ...addressForm, fullAddress: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows={3}
                required
              />
            </div>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
