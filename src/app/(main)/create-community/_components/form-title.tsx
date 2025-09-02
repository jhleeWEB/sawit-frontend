interface Props {
  title: string;
  description?: string;
}

export default function FormTitle({ title, description }: Props) {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
