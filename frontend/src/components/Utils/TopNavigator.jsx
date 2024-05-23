import React from 'react';
import { Button } from '@material-tailwind/react';

export function TopNavigator({ setCurrentSection }) {
  return (
    <div className="flex justify-center mb-4">
      <Button
        color="blue"
        variant="filled"
        className="mx-2"
        onClick={() => setCurrentSection('image')}
      >
        Image Upload
      </Button>
      <Button
        color="blue"
        variant="filled"
        className="mx-2"
        onClick={() => setCurrentSection('search')}
      >
        Product Search
      </Button>
      <Button
        color="blue"
        variant="filled"
        className="mx-2"
        onClick={() => setCurrentSection('template')}
      >
        Template Catalog
      </Button>
      <Button
        color="blue"
        variant="filled"
        className="mx-2"
        onClick={() => setCurrentSection('barcode')}
      >
        Barcode Scanner
      </Button>
    </div>
  );
}
