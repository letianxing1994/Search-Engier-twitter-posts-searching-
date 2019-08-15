import subprocess
from django.http import JsonResponse
import json


# Create your views here.
def index(request):
    query = request.GET['query']
    # javapath = "TW3Main.class"
    cmd = ['java', 'TW3Main'] + [w for w in query.split()]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    output, stderr = p.communicate()
    print(output)
    input()
    output = json.loads(output)
    return JsonResponse(output, status=200, safe=False)

