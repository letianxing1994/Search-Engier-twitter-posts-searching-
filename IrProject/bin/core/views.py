import subprocess
from django.http import JsonResponse
import json


# Create your views here.
def index(request):
    query = request.GET['query']
    cmd = ['java', 'TW3Main', query]
    print(cmd)
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    output, stderr = p.communicate()
    print(output)
    output = json.loads(output.decode('utf-8'))
    return JsonResponse(output, status=200, safe=False)

