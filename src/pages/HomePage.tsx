import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/Hero/HeroSection';
import { NextSectionPeek } from '../components/NextSectionPeek/NextSectionPeek';
import { ROUTES } from '../routes';

export default function HomePage() {
  const navigate = useNavigate();

  const onPrimaryAction = useCallback(() => navigate(ROUTES.discover), [navigate]);
  const onSecondaryAction = useCallback(() => navigate(ROUTES.courses), [navigate]);

  return (
    <>
      <HeroSection onPrimaryAction={onPrimaryAction} onSecondaryAction={onSecondaryAction} />
      <NextSectionPeek />
    </>
  );
}
