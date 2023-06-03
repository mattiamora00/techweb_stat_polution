import graphene
from graphene.types.mutation import MutationOptions

class CustomDeleteMutation(graphene.Mutation):
    ok = graphene.Boolean()
    message = graphene.String()

    class Arguments:
        id = graphene.ID()

    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, interfaces=(), resolver=None,
                                    output=None,
                                    arguments=None,
                                    _meta=None,
                                    model_class=None, **options):
        assert model_class is not None, f"Cannot instantiate delete Mutation without model_class: {cls.__name__}"
        if not _meta:
            _meta = MutationOptions(cls)
        _meta.model_class = model_class
        super(CustomDeleteMutation, cls).__init_subclass_with_meta__(interfaces=interfaces, resolver=resolver,
                                                                     output=output, arguments=arguments, _meta=_meta,
                                                                     **options)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = cls._meta.model_class.objects.get(pk=kwargs["id"])
        if hasattr(obj,"log_delete"):
            obj.log_delete(info.context.user)
        obj.delete()
        return cls(ok=True, message='Delete Successfull')
