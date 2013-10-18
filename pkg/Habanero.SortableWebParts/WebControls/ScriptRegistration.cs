using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Habanero.SortableWebParts.WebControls
{
    public class ScriptRegistration : WebControl
    {
        #region Constants

        private const string JQueryScriptPath = "/Style Library/Scripts/vendor/jquery-1.10.2.min.js";
        private const string JQueryUICustomScriptPath = "/Style Library/Scripts/vendor/jquery-ui-1.10.3.custom.min.js";
        private const string ScriptPath = "/Style Library/Scripts/sp-sortablewebparts.min.js";

        #endregion

        #region Methods

        /// <summary>
        /// Write out a reference to the script relative to the site collection URL.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="writer"></param>
        private void RegisterScripts(string path, System.Web.UI.HtmlTextWriter writer)
        {
            writer.WriteLine("<script type=\"text/javascript\" src=\"" + SPContext.Current.Site.RootWeb.ServerRelativeUrl + path + "\"/></script>");
        }

        /// <summary>
        /// Overriding render so that we can write out scripts.
        /// </summary>
        /// <param name="writer"></param>
        protected override void Render(System.Web.UI.HtmlTextWriter writer)
        {
            // Only add these scripts on edit
            if (SPContext.Current.FormContext.FormMode == SPControlMode.Edit)
            {
                RegisterScripts(JQueryScriptPath, writer);
                RegisterScripts(JQueryUICustomScriptPath, writer);
                RegisterScripts(ScriptPath, writer);
            }
        }

        public override void RenderBeginTag(HtmlTextWriter writer)
        {
            writer.Write("");
        }

        public override void RenderEndTag(HtmlTextWriter writer)
        {
            writer.Write("");
        }

        #endregion
    }
}