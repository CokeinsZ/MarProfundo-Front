import { ManualBlock } from '@/interfaces/manual';
import Image from 'next/image';

interface ManualBlockComponentProps {
  block: ManualBlock;
}

export default function ManualBlockComponent({ block }: ManualBlockComponentProps) {
  switch (block.type) {
    case 'h2':
      return (
        <div className="my-6">
          <h2 className="text-3xl font-bold text-gray-900">{block.content}</h2>
        </div>
      );

    case 'h3':
      return (
        <div className="my-4">
          <h3 className="text-2xl font-semibold text-gray-800">{block.content}</h3>
        </div>
      );

    case 'text':
      return (
        <div className="my-4">
          <p className="text-gray-700 leading-relaxed">{block.content}</p>
        </div>
      );

    case 'list':
      const items = JSON.parse(block.content) as string[];
      return (
        <div className="my-4">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {items.map((item, index) => (
              <li key={index} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'image':
      return (
        <div className="my-6">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={block.content}
              alt={`Imagen ${block.index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      );

    case 'gif':
      return (
        <div className="my-6">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={block.content}
              alt={`GIF ${block.index + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      );

    case 'video':
      return (
        <div className="my-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src={block.content.replace('watch?v=', 'embed/')}
              title={`Video ${block.index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
