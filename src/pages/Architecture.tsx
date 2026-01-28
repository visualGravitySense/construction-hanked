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
    subgraph "Источники данных"
        RHP[Riigihangete Portal<br/>riigihangete.ee]
        EPP[E-procurement Portal]
        HANKED[Hanked.ee<br/>Строительные тендеры]
        OTHER[Другие источники]
    end

    subgraph "Слой сбора данных"
        SCHEDULER[Планировщик задач<br/>Cron/Celery]
        PARSER1[Parser 1<br/>Riigihangete]
        PARSER2[Parser 2<br/>E-procurement]
        PARSER3[Parser 3<br/>Hanked.ee]
        PARSER4[Parser N<br/>Другие]
    end

    subgraph "Обработка и хранение"
        QUEUE[Очередь сообщений<br/>RabbitMQ/Redis]
        PROCESSOR[Обработчик данных<br/>Нормализация, дедупликация]
        DB[(База данных<br/>PostgreSQL)]
        CACHE[(Кэш<br/>Redis)]
    end

    subgraph "Бизнес-логика"
        FILTER[Фильтрация<br/>По категориям, регионам]
        MATCHER[Сопоставление<br/>С профилями клиентов]
        NOTIFIER[Система уведомлений]
    end

    subgraph "Профили клиентов"
        PROFILES[(Профили<br/>Категории, регионы, ключевые слова)]
    end

    subgraph "Доставка"
        EMAIL[Email-рассылка<br/>SMTP/SendGrid]
        API[REST API<br/>Для интеграций]
        WEB[Web Dashboard<br/>Личный кабинет]
        WEBHOOK[Webhooks<br/>Для внешних систем]
    end

    subgraph "Мониторинг"
        LOGS[Логирование<br/>ELK Stack]
        METRICS[Метрики<br/>Prometheus/Grafana]
        ALERTS[Алерты<br/>Ошибки парсинга]
    end

    %% Связи источники -> парсеры
    RHP --> PARSER1
    EPP --> PARSER2
    HANKED --> PARSER3
    OTHER --> PARSER4

    %% Планировщик управляет парсерами
    SCHEDULER -.-> PARSER1
    SCHEDULER -.-> PARSER2
    SCHEDULER -.-> PARSER3
    SCHEDULER -.-> PARSER4

    %% Парсеры -> Очередь
    PARSER1 --> QUEUE
    PARSER2 --> QUEUE
    PARSER3 --> QUEUE
    PARSER4 --> QUEUE

    %% Обработка данных
    QUEUE --> PROCESSOR
    PROCESSOR --> DB
    PROCESSOR --> CACHE

    %% Фильтрация и сопоставление
    DB --> FILTER
    FILTER --> MATCHER
    PROFILES --> MATCHER

    %% Уведомления
    MATCHER --> NOTIFIER
    NOTIFIER --> EMAIL
    NOTIFIER --> WEBHOOK

    %% API и веб-интерфейс
    DB --> API
    DB --> WEB
    CACHE --> API
    CACHE --> WEB

    %% Мониторинг
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

        // Инициализация mermaid
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

        // Очистка контейнера
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = '';
          
          // Рендеринг диаграммы
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
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
          setIsLoading(false);
        }
      }
    };

    // Небольшая задержка для гарантии, что DOM готов
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
          Архитектура системы
        </Typography>
        <Typography variant="body1" sx={{ color: '#757575' }}>
          Визуализация архитектуры системы парсинга тендеров
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
            <Typography sx={{ color: '#757575' }}>Загрузка диаграммы...</Typography>
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
              Ошибка при загрузке диаграммы
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
          Описание компонентов
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Источники данных
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Внешние порталы тендеров: Riigihangete Portal, E-procurement Portal, Hanked.ee (строительные тендеры) и другие источники
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Слой сбора данных
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Планировщик задач и парсеры для каждого источника данных
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Обработка и хранение
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Очередь сообщений, обработчик данных, база данных PostgreSQL и кэш Redis
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Бизнес-логика
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Фильтрация, сопоставление с профилями клиентов и система уведомлений
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Доставка
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Email-рассылка, REST API, Web Dashboard и Webhooks для внешних систем
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, background: '#fafafa', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
              Мониторинг
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Логирование (ELK Stack), метрики (Prometheus/Grafana) и система алертов
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
