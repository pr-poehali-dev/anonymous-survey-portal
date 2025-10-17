CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    session_id UUID NOT NULL DEFAULT gen_random_uuid(),
    value_rankings JSONB NOT NULL,
    accessibility_rankings JSONB NOT NULL,
    comparison_choices JSONB NOT NULL,
    total_difference INTEGER NOT NULL,
    satisfaction_index NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_results_created_at ON test_results(created_at);
CREATE INDEX idx_test_results_satisfaction ON test_results(satisfaction_index);