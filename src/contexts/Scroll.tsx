import React, { createContext, useRef } from 'react';
import { IParallax } from '@react-spring/parallax';

interface ScrollContextProps {
	scrollToSection: (page: string) => void;
}

export const ScrollContext = createContext<ScrollContextProps | undefined>(
	undefined
);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const parallaxRef = useRef<IParallax>(null);

	const scrollToSection = (page: string) => {
		let pageRef: number | undefined;
		if (page === 'Home') {
			return (pageRef = 1);
		}
		if (page === 'Services') {
			return (pageRef = 2);
		}
		if (page === 'About') {
			return (pageRef = 0);
		}
		if (parallaxRef.current) {
			parallaxRef.current.scrollTo(pageRef as number);
		}
	};

	const value = { scrollToSection };

	return (
		<ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
	);
};
