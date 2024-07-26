import React from 'react';
import Webfeedsection from '../Webfeedsection';
import Localsection from '../Localsection';
import Locallist from '../Locallist';

export default function Main() {
  return (
    <main className="flex flex-col">
      <Locallist />
      <Webfeedsection />
      <Localsection />
    </main>
  );
}
