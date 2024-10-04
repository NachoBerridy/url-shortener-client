import LinkedIn from "../atoms/LinkedIn";
import GitHub from "../atoms/Github";

export default function SocialNetworks() {
  return (
    <div className="flex gap-4">
      <LinkedIn />
      <GitHub />
    </div>
  );
}