from django.contrib import admin
from seo.models import Indexed,SearchEngine,SiteDict

# Register your models here.
class IndexedAdmin(admin.ModelAdmin):
	list_display = ('i_id','date','site','domain','url','indexed','create_time') # list
	search_fields = ('date',)

class SEAdmin(admin.ModelAdmin):
        list_display = ('se_id','value','sort_name','se_type') # list

class SDAdmin(admin.ModelAdmin):
        list_display = ('sd_id','value') # list

admin.site.register(Indexed, IndexedAdmin)
admin.site.register(SearchEngine, SEAdmin)
admin.site.register(SiteDict, SDAdmin)
