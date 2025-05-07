import React from 'react';
import { Building2, Shield } from 'lucide-react';
import { COLOR_SCHEME } from '@/lib/constants';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <Shield className="h-8 w-8 text-primary-100 absolute" />
        <Building2 className="h-5 w-5 text-primary-500 absolute top-1.5 left-1.5" />
      </div>
      <span className="text-xl font-bold text-primary-400">
        ICP Control Panel
      </span>
    </div>
  );
}
