import WomenAvatar from '../../assets/images/WomenAvatar.png';

interface ProfileIconProps {
  src: string | null;
}

export default function ProfileIcon({ src }: ProfileIconProps) {
  return (
    <button
      className="inline-block size-16 rounded-full overflow-hidden bg-gray-100 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${src || WomenAvatar})`, backgroundSize: 'cover' }}
    >
    </button>
  )
}