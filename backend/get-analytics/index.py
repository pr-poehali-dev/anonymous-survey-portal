'''
Business: Get analytics data for admin dashboard
Args: event with GET request
Returns: Statistics and distribution of test results
'''

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    stats_query = """
        SELECT 
            COUNT(*) as total_tests,
            AVG(satisfaction_index) as avg_satisfaction,
            AVG(total_difference) as avg_difference,
            MIN(total_difference) as min_difference,
            MAX(total_difference) as max_difference
        FROM test_results
    """
    
    distribution_query = """
        SELECT 
            CASE 
                WHEN total_difference <= 33 THEN 'low'
                WHEN total_difference <= 50 THEN 'medium'
                ELSE 'high'
            END as level,
            COUNT(*) as count
        FROM test_results
        GROUP BY level
    """
    
    recent_query = """
        SELECT 
            id,
            total_difference,
            satisfaction_index,
            created_at,
            course_year
        FROM test_results
        ORDER BY created_at DESC
        LIMIT 20
    """
    
    course_distribution_query = """
        SELECT 
            course_year,
            COUNT(*) as count
        FROM test_results
        WHERE course_year != ''
        GROUP BY course_year
        ORDER BY course_year
    """
    
    cur.execute(stats_query)
    stats_row = cur.fetchone()
    stats = {
        'total_tests': stats_row[0] if stats_row else 0,
        'avg_satisfaction': float(stats_row[1]) if stats_row and stats_row[1] else 0.0,
        'avg_difference': float(stats_row[2]) if stats_row and stats_row[2] else 0.0,
        'min_difference': stats_row[3] if stats_row else 0,
        'max_difference': stats_row[4] if stats_row else 0
    }
    
    cur.execute(distribution_query)
    distribution = []
    for row in cur.fetchall():
        distribution.append({'level': row[0], 'count': row[1]})
    
    cur.execute(course_distribution_query)
    course_distribution = []
    for row in cur.fetchall():
        course_distribution.append({'course': row[0], 'count': row[1]})
    
    cur.execute(recent_query)
    recent = []
    for row in cur.fetchall():
        recent.append({
            'id': row[0],
            'total_difference': row[1],
            'satisfaction_index': float(row[2]),
            'created_at': row[3].isoformat() if row[3] else None,
            'course_year': row[4] if row[4] else ''
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'stats': stats,
            'distribution': distribution,
            'course_distribution': course_distribution,
            'recent': recent
        })
    }