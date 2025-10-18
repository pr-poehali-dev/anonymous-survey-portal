'''
Business: Save test results to database
Args: event with POST body containing test data
Returns: Success confirmation with session ID
'''

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    data = json.loads(event.get('body', '{}'))
    value_rankings = data.get('valueRankings', {})
    accessibility_rankings = data.get('accessibilityRankings', {})
    comparison_choices = data.get('comparisonChoices', {})
    total_difference = data.get('totalDifference', 0)
    satisfaction_index = data.get('satisfactionIndex', 0.0)
    course_year = data.get('courseYear', '')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    query = """
        INSERT INTO test_results 
        (value_rankings, accessibility_rankings, comparison_choices, total_difference, satisfaction_index, course_year)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id, session_id
    """
    
    cur.execute(query, (
        json.dumps(value_rankings),
        json.dumps(accessibility_rankings),
        json.dumps(comparison_choices),
        total_difference,
        satisfaction_index,
        course_year
    ))
    
    result = cur.fetchone()
    conn.commit()
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
            'success': True,
            'id': result[0],
            'sessionId': str(result[1])
        })
    }