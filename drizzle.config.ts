import type { Config } from 'drizzle-kit';

export default {
  schema: './server/db/schema.ts',
  out: './server/db/migrations', // drizzle이 만들어준 sql 저장 위치 | migration: 테이블 정보가 변경/등록되는 것
} satisfies Config; // satisfies: typescript에서 제공해주는 것 - 알아보기 
