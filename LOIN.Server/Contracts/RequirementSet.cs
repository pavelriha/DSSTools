﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xbim.Ifc4.Interfaces;

namespace LOIN.Server.Contracts
{
    public class RequirementSet: LoinItem
    {
        public RequirementSet(IIfcPropertySetTemplate template) : this(null, template)
        { 
        }

        public RequirementSet(ContextMap contextMap, IIfcPropertySetTemplate template): base(template)
        {

            if (template.HasPropertyTemplates.Count > 0)
            {
                Requirements = template.HasPropertyTemplates
                    .Select(p => contextMap != null ? new Requirement(contextMap, p, template) : new Requirement(p, template))
                    .ToList();
            }
        }

        public List<Requirement> Requirements { get; set; }
    }
}
