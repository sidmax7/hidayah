/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100%',
              color: 'var(--foreground)',
              h1: {
                color: 'var(--foreground)',
                fontWeight: '700',
              },
              h2: {
                color: 'var(--foreground)',
                fontWeight: '600',
              },
              h3: {
                color: 'var(--foreground)',
                fontWeight: '600',
              },
              h4: {
                color: 'var(--foreground)',
                fontWeight: '600',
              },
              p: {
                color: 'var(--foreground)',
              },
              a: {
                color: 'var(--primary)',
                '&:hover': {
                  color: 'var(--primary)',
                },
              },
              blockquote: {
                color: 'var(--muted-foreground)',
                borderLeftColor: 'var(--border)',
              },
              strong: {
                color: 'var(--foreground)',
                fontWeight: '600',
              },
              code: {
                color: 'var(--foreground)',
                backgroundColor: 'var(--muted)',
                borderRadius: '0.25rem',
                padding: '0.25rem',
              },
              pre: {
                backgroundColor: 'var(--muted)',
                borderRadius: '0.5rem',
                padding: '1rem',
              },
              ul: {
                color: 'var(--foreground)',
              },
              ol: {
                color: 'var(--foreground)',
              },
              li: {
                color: 'var(--foreground)',
              },
            },
          },
        },
      },
    },
    plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
  }
  