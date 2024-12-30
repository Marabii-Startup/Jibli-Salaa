import { Transition } from "@headlessui/react";

export default function CustomTransition({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
