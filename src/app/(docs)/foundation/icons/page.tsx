'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faHeart,
  faBell,
  faCalendarDays,
  faFolder,
  faFile,
  faImage,
  faComment,
  faCommentDots,
  faBookmark,
  faStar,
  faClock,
  faCircle,
  faSquare,
  faCircleCheck,
  faCircleXmark,
  faCircleQuestion,
  faTrashCan,
  faPenToSquare,
  faFloppyDisk,
  faEye,
  faEyeSlash,
  faCopy,
  faThumbsUp,
  faThumbsDown,
  faFaceSmile,
  faFaceFrown,
  faMap,
  faBuilding,
  faHospital,
  faHandshake,
  faCreditCard,
  faMoneyBill1,
  faChartBar,
  faClipboard,
  faRectangleList,
  faIdCard,
  faAddressBook,
  faPaperPlane,
  faFlag,
  faLightbulb,
  faBellSlash,
  faObjectGroup,
  faCircleUser,
  faFileLines,
  faImages,
  faComments,
  faChessKnight,
  faHourglassHalf,
} from '@fortawesome/free-regular-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const icons: { name: string; icon: IconDefinition }[] = [
  { name: 'User',           icon: faUser },
  { name: 'User Circle',    icon: faCircleUser },
  { name: 'Envelope',       icon: faEnvelope },
  { name: 'Heart',          icon: faHeart },
  { name: 'Bell',           icon: faBell },
  { name: 'Bell Off',       icon: faBellSlash },
  { name: 'Calendar',       icon: faCalendarDays },
  { name: 'Clock',          icon: faClock },
  { name: 'Hourglass',      icon: faHourglassHalf },
  { name: 'Folder',         icon: faFolder },
  { name: 'File',           icon: faFile },
  { name: 'File Text',      icon: faFileLines },
  { name: 'Image',          icon: faImage },
  { name: 'Images',         icon: faImages },
  { name: 'Comment',        icon: faComment },
  { name: 'Comment Dots',   icon: faCommentDots },
  { name: 'Comments',       icon: faComments },
  { name: 'Bookmark',       icon: faBookmark },
  { name: 'Star',           icon: faStar },
  { name: 'Flag',           icon: faFlag },
  { name: 'Circle',         icon: faCircle },
  { name: 'Square',         icon: faSquare },
  { name: 'Circle Check',   icon: faCircleCheck },
  { name: 'Circle X',       icon: faCircleXmark },
  { name: 'Circle Help',    icon: faCircleQuestion },
  { name: 'Trash',          icon: faTrashCan },
  { name: 'Edit',           icon: faPenToSquare },
  { name: 'Save',           icon: faFloppyDisk },
  { name: 'Copy',           icon: faCopy },
  { name: 'Eye',            icon: faEye },
  { name: 'Eye Off',        icon: faEyeSlash },
  { name: 'Thumbs Up',      icon: faThumbsUp },
  { name: 'Thumbs Down',    icon: faThumbsDown },
  { name: 'Smile',          icon: faFaceSmile },
  { name: 'Frown',          icon: faFaceFrown },
  { name: 'Map',            icon: faMap },
  { name: 'Building',       icon: faBuilding },
  { name: 'Hospital',       icon: faHospital },
  { name: 'Handshake',      icon: faHandshake },
  { name: 'Credit Card',    icon: faCreditCard },
  { name: 'Money Bill',     icon: faMoneyBill1 },
  { name: 'Chart Bar',      icon: faChartBar },
  { name: 'Clipboard',      icon: faClipboard },
  { name: 'List',           icon: faRectangleList },
  { name: 'ID Card',        icon: faIdCard },
  { name: 'Address Book',   icon: faAddressBook },
  { name: 'Paper Plane',    icon: faPaperPlane },
  { name: 'Lightbulb',      icon: faLightbulb },
  { name: 'Object Group',   icon: faObjectGroup },
  { name: 'Chess Knight',   icon: faChessKnight },
];

const kitSnippet = `<script src="https://kit.fontawesome.com/eaf35eb535.js" crossorigin="anonymous"></script>`;

function IconCard({ name, icon }: { name: string; icon: IconDefinition }) {
  const [copied, setCopied] = useState(false);
  const faName = `fa-regular fa-${icon.iconName}`;

  const handleClick = () => {
    navigator.clipboard.writeText(faName);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="flex flex-col items-center gap-3 border border-[#DDDDDF] rounded-lg py-5 px-2 hover:border-primary hover:bg-[#7458FD]/5 transition-colors group cursor-pointer"
      onClick={handleClick}
      title={`${faName} — click to copy`}
    >
      <FontAwesomeIcon
        icon={icon}
        className="w-5 h-5 text-[#595959] group-hover:text-primary transition-colors"
      />
      <span className="text-[10px] text-center leading-tight group-hover:text-primary transition-colors">
        {copied ? (
          <span className="text-[#7458FD] font-bold">Copied!</span>
        ) : (
          <span className="text-[#595959]">{name}</span>
        )}
      </span>
    </div>
  );
}

export default function IconsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Icon set</h1>
      <p className="text-gray-500 mb-10">
        The Purple brand uses the{' '}
        <a
          href="https://fontawesome.com/search?o=r&m=free&s=regular"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-gray-700 underline"
        >
          Font Awesome icon set
        </a>{' '}
        — icons can be directly imported from their Figma library or browsed at{' '}
        <a
          href="https://fontawesome.com/search?o=r&m=free&s=regular"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary underline"
        >
          fontawesome.com
        </a>
        . Click any icon to copy its class name.
      </p>

      {/* Kit installation */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-primary mb-4">Kit installation</h2>
        <p className="text-sm text-gray-500 mb-3">
          Add the Font Awesome Kit to your HTML head for access to all icons via CDN:
        </p>
        <div className="bg-[#011638] rounded-xl px-5 py-4 font-mono text-sm text-white overflow-x-auto">
          {kitSnippet}
        </div>
      </section>

      {/* Icon grid */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-4">Common icons — Regular (outline)</h2>
        <div className="grid grid-cols-6 gap-3">
          {icons.map(({ name, icon }) => (
            <IconCard key={name} name={name} icon={icon} />
          ))}
        </div>
      </section>
    </div>
  );
}
