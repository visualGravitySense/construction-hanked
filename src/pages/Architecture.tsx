import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';

const mermaidDiagram = `
graph TB
    subgraph "Andmeallikad"
        RHP[Riigihangete Portal<br/>riigihangete.ee]
        EPP[E-procurement Portal]
        HANKED[Hanked.ee<br/>Ehitushangete portaal]
        OTHER[Muud allikad]
    end

    subgraph "Andmete kogumise kiht"
        SCHEDULER[Ülesannete plaanur<br/>Cron/Celery]
        PARSER1[Parser 1<br/>Riigihangete]
        PARSER2[Parser 2<br/>E-procurement]
        PARSER3[Parser 3<br/>Hanked.ee]
        PARSER4[Parser N<br/>Muud]
    end

    subgraph "Töötlemine ja salvestamine"
        QUEUE[Sõnumijärjekord<br/>RabbitMQ/Redis]
        PROCESSOR[Andmete töötleja<br/>Normaliseerimine, deduplikatsioon]
        DB[(Andmebaas<br/>PostgreSQL)]
        CACHE[(Vahemälu<br/>Redis)]
    end

    subgraph "Äriloogika"
        FILTER[Filtreerimine<br/>Kategooriate, piirkondade järgi]
        MATCHER[Vastavusse viimine<br/>Kliendi profiilidega]
        NOTIFIER[Teavitussüsteem]
    end

    subgraph "Kliendi profiilid"
        PROFILES[(Profiilid<br/>Kategooriad, piirkonnad, märksõnad)]
    end

    subgraph "Tarne"
        EMAIL[E-kirjade saatmine<br/>SMTP/SendGrid]
        API[REST API<br/>Integratsioonideks]
        WEB[Veebijuhtpaneel<br/>Isiklik kabiinet]
        WEBHOOK[Webhooks<br/>Väliste süsteemide jaoks]
    end

    subgraph "Seire"
        LOGS[Logimine<br/>ELK Stack]
        METRICS[Mõõdikud<br/>Prometheus/Grafana]
        ALERTS[Hoiatused<br/>Parsimise vead]
    end

    %%
    RHP --> PARSER1
    EPP --> PARSER2
    HANKED --> PARSER3
    OTHER --> PARSER4

    %%
    SCHEDULER -.-> PARSER1
    SCHEDULER -.-> PARSER2
    SCHEDULER -.-> PARSER3
    SCHEDULER -.-> PARSER4

    %%
    PARSER1 --> QUEUE
    PARSER2 --> QUEUE
    PARSER3 --> QUEUE
    PARSER4 --> QUEUE

    %%
    QUEUE --> PROCESSOR
    PROCESSOR --> DB
    PROCESSOR --> CACHE

    %%
    DB --> FILTER
    FILTER --> MATCHER
    PROFILES --> MATCHER

    %%
    MATCHER --> NOTIFIER
    NOTIFIER --> EMAIL
    NOTIFIER --> WEBHOOK

    %%
    DB --> API
    DB --> WEB
    CACHE --> API
    CACHE --> WEB

    %%
    PARSER1 -.-> LOGS
    PARSER2 -.-> LOGS
    PROCESSOR -.-> LOGS
    NOTIFIER -.-> LOGS
    
    LOGS --> METRICS
    METRICS --> ALERTS

    style RHP fill:#e1f5ff
    style EPP fill:#e1f5ff
    style HANKED fill:#e1f5ff
    style OTHER fill:#e1f5ff
    style DB fill:#ffe1e1
    style CACHE fill:#ffe1e1
    style PROFILES fill:#ffe1e1
    style EMAIL fill:#e1ffe1
    style API fill:#e1ffe1
    style WEB fill:#e1ffe1
    style WEBHOOK fill:#e1ffe1
`;

export default function Architecture() {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const diagramIdRef = useRef(`mermaid-diagram-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!mermaidRef.current) return;

      try {
        setIsLoading(true);
        setError(null);

        // Mermaid init
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#e0e0e0',
            primaryTextColor: '#212121',
            primaryBorderColor: '#bdbdbd',
            lineColor: '#757575',
            secondaryColor: '#f5f5f5',
            tertiaryColor: '#fafafa',
            background: '#ffffff',
            mainBkgColor: '#ffffff',
            secondBkgColor: '#fafafa',
            textColor: '#212121',
          },
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
          },
        });

        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '';
          
          const id = diagramIdRef.current;
          const { svg } = await mermaid.render(id, mermaidDiagram);
          
          if (isMounted && mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Error rendering mermaid diagram:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Tundmatu viga');
          setIsLoading(false);
        }
      }
    };

    // Lühike viivitus DOMi valmiduse tagamiseks
    const timer = setTimeout(() => {
      renderDiagram();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#212121',
          }}
        >
          Süsteemi arhitektuur
        </Typography>
        <Typography variant="body1" sx={{ color: '#757575' }}>
          Hangete parsija süsteemi arhitektuuri visualiseerimine
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 4,
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          overflow: 'auto',
          minHeight: '600px',
        }}
      >
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '500px',
              gap: 2,
            }}
          >
            <CircularProgress sx={{ color: '#757575' }} />
            <Typography sx={{ color: '#757575' }}>Diagrammi laadimine...</Typography>
          </Box>
        )}
        {error && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '500px',
              padding: 3,
              color: '#757575',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: '#212121' }}>
              Viga diagrammi laadimisel
            </Typography>
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}
        <Box
          ref={mermaidRef}
          sx={{
            display: isLoading || error ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            overflow: 'auto',
            '& svg': {
              maxWidth: '100%',
              height: 'auto',
            },
          }}
        />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#212121', fontWeight: 600 }}>
          Komponentide kirjeldus
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Andmeallikad
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Välishangete portaalid: Riigihangete Portal, E-procurement Portal, Hanked.ee (ehitushangete portaal) ja muud allikad
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Andmete kogumise kiht
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Ülesannete plaanur ja parsijad iga andmeallika jaoks
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Töötlemine ja salvestamine
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Sõnumijärjekord, andmete töötleja, PostgreSQL andmebaas ja Redis vahemälu
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Äriloogika
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Filtreerimine, vastavusse viimine kliendi profiilidega ja teavitussüsteem
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Tarne
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              E-kirjade saatmine, REST API, veebijuhtpaneel ja Webhooks väliste süsteemide jaoks
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Seire
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Logimine (ELK Stack), mõõdikud (Prometheus/Grafana) ja hoiatused
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
