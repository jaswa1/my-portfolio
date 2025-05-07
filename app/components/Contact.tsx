'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 text-center">
      <h2 className="text-3xl pb-4">Let&apos;s Connect</h2>
      <a href="mailto:raj@jaswal.ai" className="text-blue-500 text-xl underline">
        raj@jaswal.ai
      </a>
    </section>
  );
} 