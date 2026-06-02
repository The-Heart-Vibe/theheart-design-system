export interface PersonCardProps {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
}

export function PersonCard({ name, role, bio, photoUrl }: PersonCardProps) {
  return (
    <div className="flex flex-col gap-2">
      {photoUrl && (
        <img src={photoUrl} alt={name} className="aspect-square w-24 rounded-full object-cover" />
      )}
      <div className="text-th-h2 font-heading font-semibold text-th-black">{name}</div>
      <div className="text-th-supporting font-heading font-semibold text-th-primary">{role}</div>
      <p className="text-th-supporting font-body text-th-gray-1">{bio}</p>
    </div>
  );
}
